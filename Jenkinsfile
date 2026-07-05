pipeline {
    agent any

    environment {
        BASE_URL = 'https://automationexercise.com'
        CI = 'true'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browser') {
    steps {
       sh 'npx playwright install chromium'
    }
}

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test --project=chromium'
            }
        }
    }

    post {
    always {
        archiveArtifacts artifacts: 'playwright-report/**, test-results/**', allowEmptyArchive: true

        publishHTML([
            allowMissing: false,
            alwaysLinkToLastBuild: true,
            keepAll: true,
            reportDir: 'playwright-report',
            reportFiles: 'index.html',
            reportName: 'Playwright Report'
        ])
    }
}
}