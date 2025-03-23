pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "ayush180/weather-frontend"
        DOCKER_TAG = "v4-${BUILD_NUMBER}"
        DOCKER_CREDENTIALS_ID = 'dockerhub'
        SSH_CREDENTIALS_ID = 'ec2-user'
        REMOTE_HOST = '13.234.66.183'
        LOGS_DIR = 'logs'
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
                    sh """
                        docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                    """
                }
            }
        }

        stage('Push Image to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh """
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push ${DOCKER_IMAGE}:${DOCKER_TAG}
                    """
                }
            }
        }

        stage('Deploy on AWS EC2') {
            steps {
                sshagent([SSH_CREDENTIALS_ID]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ec2-user@${REMOTE_HOST} '
                            docker pull ${DOCKER_IMAGE}:${DOCKER_TAG} &&
                            docker stop frontend-container || true &&
                            docker rm frontend-container || true &&
                            docker run -d --name frontend-container -p 3000:80 ${DOCKER_IMAGE}:${DOCKER_TAG}
                        '
                    """
                }
            }
        }

        stage('Export Jenkins Build Logs as CSV') {
            steps {
                script {
                    sh "mkdir -p ${LOGS_DIR}"
                    def logFileName = "${LOGS_DIR}/build-${BUILD_NUMBER}.csv"
                    writeFile file: logFileName, text: """
                        Build Number,Result,Duration,Timestamp
                        ${BUILD_NUMBER},${currentBuild.currentResult},${currentBuild.duration},${currentBuild.startTimeInMillis}
                    """.stripIndent()
                }
            }
        }

        stage('Commit & Push Logs to GitHub') {
            when {
                expression { fileExists("${LOGS_DIR}/build-${BUILD_NUMBER}.csv") }
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'github-creds', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_PASS')]) {
                    sh """
                        git config --global user.email "you@example.com"
                        git config --global user.name "$GIT_USER"
                        git add ${LOGS_DIR}/build-${BUILD_NUMBER}.csv
                        git commit -m "Add logs for build ${BUILD_NUMBER}"
                        git push https://${GIT_USER}:${GIT_PASS}@github.com/ayushsharma-1/Weather-Management-System.git HEAD:main
                    """
                }
            }
        }
    }

    post {
        success {
            echo "Build ${BUILD_NUMBER} completed successfully."
        }
        failure {
            echo "Build ${BUILD_NUMBER} failed. Logs exported."
        }
    }
}
