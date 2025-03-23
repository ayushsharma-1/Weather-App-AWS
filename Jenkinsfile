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
        LOGS_DIR = "logs"
        GIT_REPO = "https://github.com/ayushsharma-1/Weather-Management-System.git"
        GIT_BRANCH = "main"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git url: "${GIT_REPO}", branch: "${GIT_BRANCH}"
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
                    sh """
                    echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin
                    docker push ${FRONTEND_IMAGE}:${IMAGE_TAG}
                    """
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

        stage('Export Jenkins Build Logs as CSV') {
            steps {
                script {
                    // Ensure logs directory exists
                    sh "mkdir -p ${LOGS_DIR}"

                    def logFile = "${LOGS_DIR}/build-${BUILD_NUMBER}.csv"

                    sh """
                    echo 'Build Number,Job Name,Status,Timestamp' > ${logFile}
                    echo '${BUILD_NUMBER},${JOB_NAME},${CURRENT_BUILD.currentResult},\$(date)' >> ${logFile}
                    """
                }
            }
        }

        stage('Commit & Push Logs to GitHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'github-creds', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_PASS')]) {
                    sh """
                    git config user.email "ayushsharma18001@gmail.com"
                    git config user.name "ayushsharma-1"

                    git add ${LOGS_DIR}/
                    git commit -m "Add Jenkins log CSV for build ${BUILD_NUMBER}" || echo "No changes to commit"
                    git push https://${GIT_USER}:${GIT_PASS}@github.com/ayushsharma-1/Weather-Management-System.git ${GIT_BRANCH}
                    """
                }
            }
        }
    }

    post {
        success {
            echo "Successfully deployed build ${IMAGE_TAG} and exported logs"
        }
        failure {
            echo "Deployment failed, logs exported"
        }
    }
}
