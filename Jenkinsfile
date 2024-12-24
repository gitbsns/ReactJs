pipeline{
    agent any
    stages{
        stage("git clone code"){
        steps{
            echo "Clone The Code"
            git url:"https://github.com/gitbsns/ReactJS.git", branch: "main" 
            
        }
        }
        stage("docker build image"){
        steps{
            echo "Build The Image"
            sh "docker build -t vital-app ."
        }
        }
        stage("dockere run container"){
        steps{
            echo "Deploye The Container"
            sh "docker run -d --name vitalapp -p 80:80 vital-app"
        }
        }
    }
    
}
