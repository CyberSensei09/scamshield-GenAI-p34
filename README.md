# 🛡️ ScamShield AI
### Detect Suspicious Messages. Stay Safe Online.

ScamShield AI is an AI-powered message analysis website designed to help users identify spam-like messages, phishing attempts, suspicious links, and common scam warning signs.

Built as a GenAI hackathon project, ScamShield combines machine-learning-based text classification with explainable security checks to help users make safer digital decisions.

---

## ✨ Features

- **🤖 AI-Powered Classification** — Classifies messages as spam-like or likely legitimate using a trained machine-learning model.
- **🔍 Suspicious Keyword Detection** — Identifies warning signs such as urgent requests, OTP requests, prize claims, and demands for payment.
- **🔗 URL Warning Checks** — Highlights potentially suspicious URLs and domain characteristics without automatically opening the links.
- **💡 Explainable Results** — Provides warning indicators to help users understand why a message may be risky.
- **📱 Responsive Interface** — Designed to work across desktop, tablet, and mobile screens.
- **⚡ Fast Analysis** — Helps users quickly review suspicious messages.
- **🔒 Privacy-Conscious Design** — Intended to analyze user-submitted text without storing messages by default.

## 🎯 Problem Statement

Digital scams and phishing messages often use urgency, impersonation, suspicious links, and requests for sensitive information to deceive people.

Many users struggle to distinguish legitimate messages from fraudulent ones.

ScamShield AI aims to make message analysis more accessible by highlighting suspicious patterns and providing an initial risk assessment.

## 💡 Our Solution

ScamShield AI uses a machine-learning text classifier and additional rule-based checks to analyze message content.

1. **Input:** The user pastes a message into the scanner.
2. **Analysis:** The classifier evaluates the message, while security checks look for suspicious keywords and URL patterns.
3. **Results:** The website presents the classification and relevant warning indicators.
4. **Awareness:** The user receives guidance on safer next steps.

> **Important:** A spam classification is not proof that a message is a scam, and a legitimate-looking classification does not guarantee safety.

## 🧰 Technology Stack

| Component | Technology |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Styling | Tailwind CSS, shadcn/ui |
| Icons | Lucide React |
| Machine Learning | Python, scikit-learn |
| Text Processing | TF-IDF |
| Classification Algorithm | Logistic Regression |
| Dataset | SMS Spam Collection dataset from Kaggle |
| Version Control | Git and GitHub |
| Frontend Deployment | Vercel |

The frontend and Python machine-learning model may be deployed separately. Actual model inference requires a configured backend or another compatible inference setup.

## 🧠 Machine Learning Model

The initial model uses a TF-IDF vectorizer and Logistic Regression to classify SMS messages into two categories:

- **Ham:** Messages labelled as legitimate in the training dataset.
- **Spam:** Messages labelled as spam in the training dataset.

### Dataset

The model was trained and evaluated using the SMS Spam Collection dataset available on Kaggle.

Dataset link: https://www.kaggle.com/datasets/uciml/sms-spam-collection-dataset

Dataset size after preprocessing: **5,572 messages**

| Label | Number of messages |
|---|---:|
| Ham | 4,825 |
| Spam | 747 |
| **Total** | **5,572** |

### Model Performance

The following metrics were obtained on a held-out test set of 1,115 messages.

| Metric | Score |
|---|---:|
| Accuracy | **98.39%** |
| Precision (spam class) | **94.56%** |
| Recall (spam class) | **93.29%** |
| F1-score (spam class) | **93.92%** |

**What do these metrics mean?**

- **Accuracy:** Percentage of all test messages classified correctly.
- **Precision:** Of the messages predicted as spam, the percentage that were actually spam.
- **Recall:** Of the actual spam messages, the percentage detected by the model.
- **F1-score:** The harmonic mean of precision and recall.

These scores measure performance on the test dataset, not guaranteed performance on new real-world scam messages. The dataset is primarily an SMS spam dataset and does not represent every type of phishing or fraud.

## 🖥️ Website Preview

The website provides a message input area, analysis action, classification result, and relevant warning indicators.

Add a screenshot of your deployed website here when available:

```text
docs/
└── scamshield-preview.png
```

You can then display it in this README with:

```markdown
![ScamShield AI Preview](docs/scamshield-preview.png)
```

## 🚀 Live Demo

**Website:** Add your deployed Vercel URL here.

Example: `https://your-project.vercel.app`

## ⚙️ Getting Started

### Prerequisites

For local development, you will need:

- Node.js compatible with your project's Next.js version
- npm
- Git (optional if you download the source code)

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/ScamShield.git
cd ScamShield
```

Replace `YOUR-USERNAME` with your GitHub username.

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

> These instructions apply to the Next.js frontend. The Python model requires its own compatible inference setup if it is not already integrated.

## ☁️ Deployment on Vercel

1. Push the project to GitHub.
2. Sign in to [Vercel](https://vercel.com/).
3. Select **Add New → Project**.
4. Import the ScamShield GitHub repository.
5. Review the build settings and environment variables, if required.
6. Click **Deploy**.
7. Open the generated deployment URL and test the website.

Future commits to the connected repository can trigger automatic deployments.

## 🔌 Machine Learning Integration

The trained scikit-learn model is a Python artifact and cannot be loaded directly by a standard browser-based React application.

To use real model predictions in production:

1. Train and evaluate the model in Kaggle.
2. Export the trained model and preprocessing pipeline.
3. Deploy them to a compatible Python inference service, or use another supported inference architecture.
4. Create an API endpoint that accepts a message and returns the prediction and relevant analysis details.
5. Configure the frontend to call the endpoint securely.
6. Test the deployed integration with legitimate, spam-like, and unfamiliar messages.

If the website is running in demo mode, clearly label its results as demo or rule-based analysis rather than predictions from the trained model.

## 🔐 Privacy and Safety

- Do not enter real passwords, OTPs, banking details, or other sensitive personal information into a public demo.
- Suspicious URLs should be displayed for inspection, not opened automatically.
- Avoid logging or retaining message content unless there is a clear need and appropriate user notice.
- Never expose API keys or private credentials in frontend code or a public GitHub repository.
- Automated analysis can produce false positives and false negatives.

## ⚠️ Limitations

- The initial training dataset focuses on SMS spam rather than every category of online fraud.
- Language, context, and scam techniques may change over time.
- URL pattern checks are warning signals, not proof that a URL is malicious.
- High test-set scores do not guarantee equivalent performance on real-world messages.
- The system is an awareness and screening aid, not a replacement for official security checks.

## 🔮 Future Enhancements

- Support for additional languages.
- Improved phishing and impersonation detection.
- More robust URL reputation checks using trusted security services.
- Model evaluation on larger and more diverse datasets.
- User feedback for improving future model versions.
- Privacy-preserving analytics and monitoring.
- Expanded explainability and accessibility features.

## 👥 Team

**Project:** ScamShield AI  
**Event:** GenAI Hackathon

Add your team members, institution, and mentor details here if required.

## 📚 References

- [SMS Spam Collection Dataset — Kaggle](https://www.kaggle.com/datasets/uciml/sms-spam-collection-dataset)
- [scikit-learn Documentation](https://scikit-learn.org/stable/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)

## 📄 License

Choose and add an appropriate open-source license before distributing this project publicly.

---

**ScamShield AI — Think Before You Click. Stay Safe Online.**
