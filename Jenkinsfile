pipeline {
  agent any

  stages {
    stage('Clone repo') {
      steps {
        git branch: 'main',
            url: 'https://github.com/mkv-mkverma/products-curd.git'
      }
    }

    stage('Install dependencies') {
      steps { sh 'npm install' }
    }

    stage('Build React app') {
      steps { sh 'npm run build' }
    }

    stage('Post build') {
      steps { echo '✅ Build completed!' }
    }
  }
}
