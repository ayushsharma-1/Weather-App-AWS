pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
        AWS_EC2_KEY = credentials('aws-ec2-key')

        BACKEND_IMAGE = 'ayush180/weather-backend'
        FRONTEND_IMAGE = 'ayush180/weather-frontend'
        IMAGE_TAG = 'v3'

        REMOTE_HOST = 'ec2-user@<AWS-VM-PUBLIC-IP>'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/ayushsharma-1/Weather-Management-System.git', branch: 'main'
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir('backend') {
                    sh "docker build -t ${BACKEND_IMAGE}:${IMAGE_TAG} ."
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('frontend') {
                    sh "docker build -t ${FRONTEND_IMAGE}:${IMAGE_TAG} ."
                }
            }
        }

        stage('Push Images to DockerHub') {
            steps {
                script {
                    docker.withRegistry('', DOCKERHUB_CREDENTIALS) {
                        docker.image("${BACKEND_IMAGE}:${IMAGE_TAG}").push()
                        docker.image("${FRONTEND_IMAGE}:${IMAGE_TAG}").push()
                    }
                }
            }
        }

        stage('Deploy on AWS EC2') {
            steps {
                sshagent (credentials: ['aws-ec2-key']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ${REMOTE_HOST} '
                    docker pull ${BACKEND_IMAGE}:${IMAGE_TAG} &&
                    docker pull ${FRONTEND_IMAGE}:${IMAGE_TAG} &&

                    docker stop backend-container || true &&
                    docker rm backend-container || true &&
                    docker stop frontend-container || true &&
                    docker rm frontend-container || true &&

                    docker run -d --name backend-container -p 5000:5000 ${BACKEND_IMAGE}:${IMAGE_TAG} &&
                    docker run -d --name frontend-container -p 3000:3000 ${FRONTEND_IMAGE}:${IMAGE_TAG}
                    '
                    """
                }
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Complete!'
        }
        failure {
            echo '❌ Pipeline Failed!'
        }
    }
}
