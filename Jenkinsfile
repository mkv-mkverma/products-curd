pipeline {
  agent any

  environment {
    AWS_DEFAULT_REGION = 'us-east-1'     // ✅ Match your configured region
    S3_BUCKET = 'your-s3-bucket-name'    // 🔁 Replace with your actual bucket name
  }

  stages {
    stage('Clone Repo') {
      steps {
        git branch: 'main',
            url: 'https://github.com/mkv-mkverma/products-curd.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build Product CRUD App') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Deploy to S3') {
      steps {
        sh 'aws s3 sync ./dist/products-crud-app s3://$S3_BUCKET --delete'
      }
    }

    stage('Post build') {
      steps {
        echo '✅ Build and deploy completed!'
      }
    }
  }
}
