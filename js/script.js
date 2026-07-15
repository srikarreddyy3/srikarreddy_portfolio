const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('.logo');
const sections = document.querySelectorAll('section');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');

menuIcon.addEventListener('click', () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
});

const activePage = () => {
  const header = document.querySelector('header');
  const barsBox = document.querySelector('.bars-box');

  header.classList.remove('active');
  setTimeout(() => {
    header.classList.add('active');
  }, 1100);

  navLinks.forEach((link) => {
    link.classList.remove('active');
  });

  barsBox.classList.remove('active');
  setTimeout(() => {
    barsBox.classList.add('active');
  }, 1100);

  sections.forEach((section) => {
    section.classList.remove('active');
  });

  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');
}

navLinks.forEach((link, idx) => {
  link.addEventListener('click', () => {
    if (!link.classList.contains('active')) {
      activePage();
      link.classList.add('active');
      setTimeout(()=> {
        sections[idx].classList.add('active');
      }, 1100)
    }
  });
});

logoLink.addEventListener('click', () => {
  if(!navLinks[0].classList.contains('active')) {
    activePage();
    navLinks[0].classList.add('active');

    setTimeout(() => {
      sections[0].classList.add('active');
    }, 1100);
  }
});

const resumeBtns = document.querySelectorAll(".resume-btn");

resumeBtns.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    const resumeDetails = document.querySelectorAll(".resume-detail");

    resumeBtns.forEach((btn) => {
      btn.classList.remove("active");
    });
    btn.classList.add("active");

    resumeDetails.forEach((detail) => {
      detail.classList.remove("active");
    });
    resumeDetails[idx].classList.add("active");
  });
});

const arrowRight = document.querySelector(
  ".portfolio-box .navigation .arrow-right"
);
const arrowLeft = document.querySelector(
  ".portfolio-box .navigation .arrow-left"
);

let index = 0;

const activePortfolio = () => {
  const imgSlide = document.querySelector(".portfolio-carousel .img-slide");
  const portfolioDetails = document.querySelectorAll('.portfolio-detail');

  imgSlide.style.transform = `translateX(calc(${index * -100}% - ${
    index * 2
  }rem))`;

  portfolioDetails.forEach(detail => {
    detail.classList.remove('active');
  });

  portfolioDetails[index].classList.add('active');

};

arrowRight.addEventListener('click', () => {
  if (index < 4) {
    index++;
    arrowLeft.classList.remove("disabled");
  } else {
    index = 5;
    arrowRight.classList.add("disabled");
  }

  activePortfolio();
});


arrowLeft.addEventListener("click", () => {
  if (index > 1) {
    index--;
    arrowRight.classList.remove("disabled");
  } else {
    index = 0;
    arrowLeft.classList.add("disabled");
  }

  activePortfolio();
});

// Chatbot logic
const chatbot = document.getElementById('chatbot');
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');

const cannedResponses = [
  { keywords: ['hello', 'hi', 'hey'], answer: 'Hi there! I am your portfolio assistant. Ask me about my projects, skills, or experience.' },
  {
    keywords: ['current', 'experience', 'work'],
    answer:
      'Current position: Machine Learning Engineer at Elastic, building ML pipelines, deploying scalable AI systems, and optimizing inference. 3+ years in data science, previously at IBM (data scientist) and academic research roles. Key strengths: data engineering, model deployment, production monitoring, and MLOps practices.',
  },
  {
    keywords: ['responsibility', 'responsibilities', 'role', 'task'],
    answer:
      'Responsibilities include: designing ETL/data pipelines, architecting cloud infrastructure on AWS, implementing ML models in TensorFlow/PyTorch, delivering LLM solutions with LangChain/RAG, and leading MLOps automation with CI/CD across GitHub Actions, Jenkins, and Kubernetes.',
  },
  {
    keywords: ['project', 'projects', 'work'],
    answer:
      'Highlighted projects:\n1) NYC Taxi Demand Predictor (AWS pipeline, CatBoost, real-time API deployment)\n2) Multilingual NLP classifier (CNN+BiLSTM, 93.91% accuracy)\n3) Cloud-Native YouTube Insights (serverless ETL, QuickSight dashboards)\n4) LangChain RAG system with PDF ingestion and Llama-3 search \n5) Song Lyric Generator (LSTM/GPT-2)\n6) PCOS detection (DenseNet121/ViT, Gradio deployment).',
  },
  { keywords: ['skills', 'skill'], answer: 'I am proficient in Python, AWS, Spark, TensorFlow, PyTorch, LangChain, Hugging Face, and modern MLOps pipelines.' },
  { keywords: ['contact', 'email', 'phone'], answer: 'Reach me via email at srikarreddyy3@gmail.com or phone at (+1) 720 234 7493.' },
  { keywords: ['llm', 'langchain', 'rag'], answer: 'I build LLM & Generative AI workflows using LangChain, Hugging Face, and vector search systems with RAG patterns.' },
];

const getBotResponse = (text) => {
  const normalized = text.trim().toLowerCase();
  if (!normalized) return 'Please type a question so I can help you.';

  if (normalized.includes('thank')) return 'You are welcome! If you have more questions, I’m here.';
  if (normalized.includes('bye') || normalized.includes('goodbye')) return 'Thanks for chatting—feel free to message me anytime!';

  // Explicit project name responses
  if (normalized.includes('nyc taxi') || normalized.includes('taxi demand')) {
    return 'NYC Taxi Demand Predictor: Built a serverless AWS ETL pipeline to process 9.3M taxi trips and weather data. Trained CatBoost model with a 15% accuracy gain and deployed real-time inference via AWS Lambda + API Gateway for low-latency predictions.';
  }

  if (normalized.includes('elastic') && normalized.includes('responsibility') || normalized.includes('elastic') && normalized.includes('role')) {
    return 'Elastic responsibilities: design and deploy end-to-end machine learning pipelines, build real-time anomaly detection and log analytics systems, fine-tune transformer NLP models for semantic search, integrate Bedrock + Elasticsearch vector search, and implement MLOps CI/CD and model monitoring for high-scale production.';
  }

  if (normalized.includes('ibm') && normalized.includes('responsibility') || normalized.includes('ibm') && normalized.includes('role')) {
    return 'IBM responsibilities: develop ETL pipelines with Python, SQL, and Spark; deploy scalable models in IBM Cloud; automate lifecycle with Airflow; streamline CI/CD with Docker/Kubernetes/Jenkins; build models for fraud detection and predictive maintenance.';
  }

  if ((normalized.includes('aurora') || normalized.includes('course facilitator')) && normalized.includes('responsibility')) {
    return 'Aurora/academic responsibilities: facilitated advanced statistics courses, mentored 200+ students, taught hypothesis testing, reproducible workflows, collaboration, and effective communication for technical and non-technical audiences.';
  }

  if (normalized.includes('multilingual') || normalized.includes('language detection')) {
    return 'AI-Powered Multilingual Detection: Implemented hybrid CNN + BiLSTM model achieving 93.91% accuracy on 20 languages. Optimized embedding compression with PCA and scaled processing for 1.8M samples.';
  }

  if (normalized.includes('youtube') && normalized.includes('insight') || normalized.includes('cloud-native')) {
    return 'Cloud-Native YouTube Data Insights: Designed a serverless pipeline (S3/Glue/Lambda/Athena/QuickSight) for 100k+ daily video records. Achieved 70% faster ETL and real-time analytics dashboards.';
  }

  if (normalized.includes('langchain') || normalized.includes('rag')) {
    return 'The LangChain Chronicles: Built a RAG retrieval chain with PDF ingestion, FAISS vector store, and Llama-3 via Ollama. Included recursive chunking and prompt design for accurate domain Q&A over large docs.';
  }

  if (normalized.includes('song') || normalized.includes('lyrics')) {
    return 'Songs Lyric Generator: Compared Naive Bayes N-Gram, LSTM, and GPT-2 models on 762-song dataset. Achieved coherent style output and 96%+ LSTM accuracy after 20 epochs.';
  }

  if (normalized.includes('pcos')) {
    return 'PCOS Detection: Built DenseNet121/ViT/custom CNN pipeline for ultrasound images. Delivered clinical-grade metrics with AUC optimization and a Gradio/Hugging Face Spaces deployment for demo access.';
  }

  for (const item of cannedResponses) {
    if (item.keywords.some((kw) => normalized.includes(kw))) {
      return item.answer;
    }
  }

  // Personal profile / default fallback: include rich details for anything you ask
  if (
    normalized.includes('about you') ||
    normalized.includes('who are you') ||
    normalized.includes('tell me about') ||
    normalized.includes('personal') ||
    normalized.includes('bio')
  ) {
    return 'I am Srikar Reddy Nelavetla: a Data Scientist and Machine Learning Engineer with 3+ years experience. I excel at data engineering, cloud architecture, MLOps, and LLM workflows. My core skills include Python, Spark, AWS, TensorFlow, PyTorch, LangChain, and Hugging Face. I deliver analytics and AI platforms from design to production.';
  }

  // Define command for explicit terms
  if (normalized.startsWith('define:')) {
    const topic = normalized.replace('define:', '').trim();
    if (topic && defineMap[topic]) {
      return defineMap[topic];
    }
    return 'Sorry, I don’t have a definition for that exact topic yet. Try another tech term or related concept.';
  }

  // Final fallback: avoid hallucination, ask for clearer known info, or use defined topics
  return 'I’m sorry, I don’t have direct information for that query. Try: "project NYC Taxi Demand Predictor", "responsibilities at Elastic", "define: MLops", or "about you". If you need more details, I can only answer from the information contained in this portfolio.';
};

// Predefined declarative definitions for define: commands
const defineMap = {
  'data engineering': 'Data engineering: building scalable ETL pipelines, data lakes, and infrastructure with tools like Spark, dbt, Snowflake, and AWS services.',
  'mlops': 'MLOps: automating model training, deployment, monitoring, versioning, and continuous integration using CI/CD pipelines, Docker, Kubernetes, and monitoring tools.',
  'llm workflows': 'LLM workflows: constructing retrieval-augmented generation (RAG) and prompt-engineering systems using LangChain, vector stores, and transformer models.',
  'elastic': 'At Elastic, responsibilities include designing ML pipelines, real-time anomaly detection, and production model monitoring on Elastic Stack.',
  'ibm': 'At IBM, responsibilities include building Spark ETL pipelines, deploying models to IBM Cloud, and implementing Airflow-based automation.',
  'aurora': 'At Aurora, responsibilities include facilitating courses, mentoring students, and teaching reproducible statistical workflows and data science concepts.',
  'nyc taxi demand predictor': 'NYC Taxi Demand Predictor: serverless AWS pipeline, 9.3M trips, CatBoost model, API Gateway & Lambda deployment for real-time inference.',
};

const appendMessage = (sender, text) => {
  const msg = document.createElement('div');
  msg.classList.add('chatbot-message', sender);
  msg.textContent = text;
  chatbotMessages.appendChild(msg);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
};

const sendMessage = () => {
  const text = chatbotInput.value.trim();
  if (!text) return;

  appendMessage('user', text);
  chatbotInput.value = '';

  setTimeout(() => {
    appendMessage('bot', getBotResponse(text));
  }, 400);
};

chatbotToggle.addEventListener('click', () => {
  chatbot.classList.add('chatbot-open');
  chatbot.classList.remove('chatbot-closed');
  chatbotInput.focus();
});

chatbotClose.addEventListener('click', () => {
  chatbot.classList.remove('chatbot-open');
  chatbot.classList.add('chatbot-closed');
});

chatbotSend.addEventListener('click', sendMessage);

chatbotInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendMessage();
  }
});

// Bootstrap welcome message
setTimeout(() => {
  appendMessage('bot', 'Hello! 👋 I’m your smart portfolio assistant. Ask me anything about this site.');
}, 500);

