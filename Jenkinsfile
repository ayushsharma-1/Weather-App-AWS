pipeline {
    agent any

    environment {
        BACKEND_IMAGE = 'ayush180/weather-backend'
        FRONTEND_IMAGE = 'ayush180/weather-frontend'
        IMAGE_TAG = "v3-${BUILD_NUMBER}" // or use commit hash
    }

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/ayushsharma-1/Weather-Management-System.git', branch: 'main'
            }
        }

        stage('Build Docker Images') {
            parallel {
                stage('Backend') {
                    steps {
                        dir('backend') {
                            sh "docker build -t ${BACKEND_IMAGE}:${IMAGE_TAG} ."
                        }
                    }
                }
                stage('Frontend') {
                    steps {
                        dir('frontend') {
                            sh "docker build -t ${FRONTEND_IMAGE}:${IMAGE_TAG} ."
                        }
                    }
                }
            }
        }

        stage('Push Images to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                    echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                    docker push ${BACKEND_IMAGE}:${IMAGE_TAG}
                    docker push ${FRONTEND_IMAGE}:${IMAGE_TAG}
                    '''
                }
            }
        }

        stage('Deploy on AWS EC2') {
            steps {
                sshagent (credentials: ['aws-ec2-key']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ec2-user@<AWS-VM-PUBLIC-IP> '
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
            echo "✅ Successfully deployed build ${IMAGE_TAG}!"
        }
        failure {
            echo "❌ Deployment failed!"
        }
    }
}
