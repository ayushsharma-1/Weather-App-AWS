pipeline {
    agent any

    triggers {
        githubPush()
    }

    environment {
        FRONTEND_IMAGE = 'ayush180/weather-frontend'
        IMAGE_TAG = "v4-${BUILD_NUMBER}"
        AWS_VM_PUBLIC_IP = "13.234.66.183"
        SSH_USER = "ec2-user"
        FRONTEND_PORT = "3000"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/ayushsharma-1/Weather-Management-System.git', branch: 'main'
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('frontend') {
                    sh "docker build -t ${FRONTEND_IMAGE}:${IMAGE_TAG} ."
                }
            }
        }

        stage('Push Image to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                    echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                    docker push ${FRONTEND_IMAGE}:${IMAGE_TAG}
                    '''
                }
            }
        }

        stage('Deploy on AWS EC2') {
            steps {
                sshagent (credentials: ['aws-ec2-key']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ${SSH_USER}@${AWS_VM_PUBLIC_IP} '
                    docker pull ${FRONTEND_IMAGE}:${IMAGE_TAG} &&
                    docker stop frontend-container || true &&
                    docker rm frontend-container || true &&
                    docker run -d --name frontend-container -p ${FRONTEND_PORT}:80 ${FRONTEND_IMAGE}:${IMAGE_TAG}
                    '
                    """
                }
            }
        }
    }

    post {
        success {
            echo "Successfully deployed build ${IMAGE_TAG}"
        }
        failure {
            echo "Deployment failed"
        }
    }
}
