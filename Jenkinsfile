pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "ayush180/weather-frontend"
        DOCKER_TAG = "v4-${BUILD_NUMBER}"
        DOCKER_CREDENTIALS_ID = 'dockerhub-creds'
        SSH_CREDENTIALS_ID = 'aws-ec2-key'
        GITHUB_CREDENTIALS_ID = 'github-creds'
        REMOTE_HOST = '13.234.21.167'
        LOGS_DIR = 'logs'
        GIT_REPO = 'https://github.com/ayushsharma-1/Weather-Management-System.git'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git url: "${GIT_REPO}", branch: 'main', credentialsId: "${GITHUB_CREDENTIALS_ID}"
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
                withCredentials([usernamePassword(
                    credentialsId: "${DOCKER_CREDENTIALS_ID}",
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh """
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push ${DOCKER_IMAGE}:${DOCKER_TAG}
                    """
                }
            }
        }

        stage('Deploy on AWS EC2') {
            steps {
                sshagent(credentials: ["${SSH_CREDENTIALS_ID}"]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@${REMOTE_HOST} '
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
                    def buildInfo = """
                        Build Number,Result,Duration(ms),Timestamp(ms)
                        ${BUILD_NUMBER},${currentBuild.currentResult},${currentBuild.duration},${currentBuild.startTimeInMillis}
                    """.stripIndent()

                    writeFile file: logFileName, text: buildInfo
                }
            }
        }

        stage('Commit & Push Logs to GitHub') {
            when {
                expression { fileExists("${LOGS_DIR}/build-${BUILD_NUMBER}.csv") }
            }
            steps {
                withCredentials([usernamePassword(
                    credentialsId: "${GITHUB_CREDENTIALS_ID}",
                    usernameVariable: 'GIT_USER',
                    passwordVariable: 'GIT_PASS'
                )]) {
                    sh """
                        git config --global user.email "ayushsharma18001@gmail.com"
                        git config --global user.name "$GIT_USER"
                        git remote set-url origin https://${GIT_USER}:${GIT_PASS}@github.com/ayushsharma-1/Weather-Management-System.git
                        git add ${LOGS_DIR}/build-${BUILD_NUMBER}.csv
                        git commit -m "Add logs for build ${BUILD_NUMBER}" || echo "No changes to commit"
                        git push origin main
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Build ${BUILD_NUMBER} completed successfully."
        }
        failure {
            echo "❌ Build ${BUILD_NUMBER} failed. Logs exported."
        }
        always {
            cleanWs()
        }
    }
}
