pipeline {
    agent any

    tools {
        nodejs "NODE22"
    }

    triggers{
        pollSCM('H/2 * * * *')
    }

    environment{
        DOCKER_IMAGE = "vermas2012d/jenkins_etp_preparation"
        CONTAINER_NAME = "etp_preparation"
        DOCKER_TAG = "latest"
        PORT = "4000"
    }

    stages {
        stage("Clone Repository"){
            steps {
                git url: "https://github.com/Vermas2004d/JenkinsPractice1.git",
                branch: "main"
            }
        }

        stage("Install Dependencies"){
            steps {
                sh "npm install" 
            }
        }

        stage("Build Docker Image"){
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
            }
        }

        stage("Push Docker Image"){
            steps{
                withCredentials([
                    usernamePassword(
                        credentialsId: "dockerhub",
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]){
                    sh """
                        echo "\$DOCKER_PASSWORD" | docker login -u "\$DOCKER_USERNAME" --password-stdin 
                        docker push ${DOCKER_IMAGE}:${DOCKER_TAG}
                    """
                }
            }
        }

        stage("Stop Old Container"){
            steps {
                sh "docker rm -f ${CONTAINER_NAME} || true"
            }
        }

        stage("Run New Container"){
            steps {
                sh """
                    docker run -d \
                    -p ${PORT}:4000 \
                    --name ${CONTAINER_NAME} \
                    ${DOCKER_IMAGE}:${DOCKER_TAG}
                """
            }
        }

    }

    post {
        success {
            echo "Pipeline executed succesfully."
        }
        failure {
            echo "Pipeline execution failed."
        }
        always {
            sh "docker logout || true"
        }
    }

}