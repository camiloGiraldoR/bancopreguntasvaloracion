# Skill Descriptions: Cloud for Developers

This document covers the essential cloud-native skills, focusing on delivery pipelines, security, infrastructure components, and cloud-specific services.

---

## 1. CI/CD - Scripting
**Description**
Continuous Integration (CI) and Continuous Deployment (CD) are practices that automate the building, testing, and deployment of software. Scripting is the engine behind these pipelines, using tools like Bash, Python, or specialized YAML syntaxes to orchestrate complex workflows.

A well-architected CI/CD pipeline ensures that every code change is automatically verified, versioned, and ready for production. This reduces manual errors and allows teams to deliver value faster and with higher confidence in the stability of the system.

Scripting allows for custom logic within these pipelines, such as environment-specific configuration, specialized security scans, or custom notification systems. Mastering these scripts is a core skill for any modern developer working in a DevOps-oriented organization.

**Key Points**
*   Automates the software lifecycle through scripted workflows, ensuring consistent, frequent, and reliable delivery of high-quality code.

---

## 2. AEM Forms Security (PII)
**Description**
Security in cloud services, particularly when handling Personally Identifiable Information (PII) in platforms like Adobe Experience Manager (AEM) Forms, is a critical concern. It involves implementing strict encryption, access controls, and data masking to protect sensitive user data.

Developers must ensure that data is encrypted both at rest and in transit. This also includes adhering to compliance standards (like GDPS or HIPAA) and implementing robust logging and monitoring to detect any unauthorized access or data breaches in real-time.

Proper security management in AEM Forms also requires a deep understanding of permission models and the principle of "least privilege." This ensures that users and services only have access to the specific data and functions necessary for their roles.

**Key Points**
*   Protects sensitive user data (PII) through encryption, rigorous access control, and compliance-driven security practices in cloud platforms.

---

## 3. Compute (VMs, Containers, Lambdas, Webapps, Beanstalk)
**Description**
Cloud providers offer various "Compute" options tailored to different architectural needs. These range from traditional Virtual Machines (VMs) for maximum control to serverless Lambdas for event-driven functions and managed platforms like AWS Elastic Beanstalk for easier application staging.

Choosing the right compute service depends on factors like scalability requirements, management overhead, and cost. Containers (like ECS or EKS) offer a balance of portability and control, while Web Apps services provide a fully managed environment for web-based services.

Modern developers must understand the trade-offs of each model. For instance, while VMs offer full OS control, they require significant maintenance, whereas Lambdas scale automatically but have execution time limits and cold start considerations.

**Key Points**
*   Provides a diverse range of execution environments, from full infrastructure control to managed serverless functions, to meet specific scaling and operational needs.

---

## 4. Databases - Messaging - Events - Monitoring
**Description**
The cloud ecosystem includes specialized services for data storage, communication, and system health. Cloud databases (SQL and NoSQL) offer high availability, while messaging (SQS) and event services (EventBridge) enable decoupled, asynchronous communication.

Monitoring and observability are essential for maintaining these distributed systems. Services like CloudWatch or Datadog provide real-time metrics, logs, and traces, allowing developers to identify bottlenecks and troubleshoot issues before they impact users.

Integrating these services properly ensures that the application is not only functional but also resilient and performant. For example, using a message queue can smooth out traffic spikes, while robust monitoring provides the data needed for automatic scaling decisions.

**Key Points**
*   Integrates essential infrastructure services for state management, communication, and system observability to ensure high reliability and operational excellence.

---

## 5. Network Basics & Components
**Description**
Cloud networking forms the backbone of a secure and performant cloud architecture. Key components include Virtual Private Clouds (VPCs), Subnets, Route Tables, and Load Balancers, which control how traffic flows between services and the public internet.

Security Groups and Network Access Control Lists (NACLs) act as virtual firewalls, restricting traffic based on protocol, port, and IP address. Mastering these components is essential for implementing a "Defense in Depth" strategy and ensuring network isolation.

Proper network design also improves performance through optimized routing and localizing traffic within regions. Load balancers further enhance availability by distributing traffic across multiple healthy instances of a service.

**Key Points**
*   Manages the secure and efficient flow of data between cloud services using structured networking components like VPCs, subnets, and firewalls.

---

## 6. Storage (Buckets)
**Description**
Cloud object storage, commonly referred to as "Buckets" (e.g., AWS S3, Google Cloud Storage), provide highly durable and scalable storage for unstructured data like images, logs, and backups. It is designed to be accessible from anywhere via web APIs.

Unlike traditional block storage, object storage is optimized for scale rather than low-latency file system operations. It includes features like versioning, lifecycle policies (to move old data to cheaper storage tiers), and fine-grained access control.

Buckets are often used as the "data lake" in modern architectures, serving as the source of truth for analytics, static website hosting, and large-scale data processing pipelines. Their virtually infinite capacity makes them a cornerstone of cloud infrastructure.

**Key Points**
*   Offers highly scalable and durable storage for unstructured data, featuring automated lifecycle management and robust web-based access controls.
