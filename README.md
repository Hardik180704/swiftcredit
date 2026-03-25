# SwiftCredit: MSME Lending Decision System

A premium, full-stack Next.js application designed to instantly evaluate and process lending decisions for Micro, Small, and Medium Enterprises (MSMEs). SwiftCredit utilizes an algorithmic risk engine paired with a stunning, high-contrast, black-and-white editorial aesthetic to deliver real-time credit outcomes.

## 📸 Application Gallery

<p align="center">
  <img src="public/SC.png" alt="Landing Page UI" width="45%" style="margin: 1%" />
  <img src="public/SC2.png" alt="Application Profile UI" width="45%" style="margin: 1%" />
  <img src="public/SC3.png" alt="Application Loan UI" width="45%" style="margin: 1%" />
  <img src="public/SC4.png" alt="Decision Result UI" width="45%" style="margin: 1%" />
</p>

## 🚀 Key Features

*   **Algorithmic Precision**: A robust algorithmic decision engine that processes financial profiles against strict industry baseline ratios (EMI-to-Revenue, Capital-to-Revenue, etc.) to calculate a comprehensive `/100` credit score.
*   **Premium User Experience (UX)**: A luxury, ultra-modern split-screen design powered by Tailwind CSS. It features glassmorphism micro-animations, animated progress tracks, and softly glowing status borders reminiscent of high-end fintech platforms like Stripe and Apple Card.
*   **Advanced Audit Trails**: A persistent, beautifully visualized backend logging timeline that records every application submission and automated machine-decision on the final result page.
*   **Rate-Limiting Security**: Custom in-memory rate-limiting middleware engineered to intelligently protect the system APIs from spam while maintaining extremely low latency.
*   **Persistent Data Architecture**: Backend powered by Prisma ORM securely connected to a high-speed Prisma Postgres cloud-native database.

## 🛠️ Technology Stack

*   **Framework**: Next.js 14 (App Router)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS
*   **Database ORM**: Prisma (v5.22.0)
*   **Database**: PostgreSQL
*   **Validation**: Zod + React Hook Form
*   **Icons**: Lucide React

## 💻 Getting Started

### Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file in the root directory and securely add your database connection string:
   ```env
   DATABASE_URL="postgres://user:password@hostname:5432/dbname?sslmode=require"
   ```

3. **Initialize the Database**
   Generate the typed Prisma Client architecture and push the schema structure to align your database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run the Application**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the engine.

### Docker Deployment

A highly-optimized, multi-stage Alpine Dockerfile is natively included for immediate containerized production deployments.

1. **Build the Image**
   ```bash
   docker build -t msme-lending .
   ```

2. **Run the Container**
   Inject your live database URL via environment variables to run the hyper-optimized production build natively mapped to port 3000:
   ```bash
   docker run -p 3000:3000 -e DATABASE_URL="YOUR_PRISMA_POSTGRES_URL_HERE" msme-lending
   ```

## 🧠 Decision Engine Criteria

The internal scoring system evaluates an MSME across several critical dimensions:
*   **Repayment Capacity**: The ideal ratio demands `<30%` of the firm's monthly revenue committed against the requested loan EMI.
*   **Capital Risk Multiplier**: Loan requests exceeding 6x monthly revenue triggers heavy calculation penalties.
*   **Entity Verification**: Real-time PAN format validation (exactly 5 letters, 4 numbers, 1 letter) stringently checks for genuine tax entity profiles.
*   **Decision Rendering**: Automatic rejection constraints forcefully deploy on scores under `60/100`, providing dynamically rendered trailing *Reason Codes* (e.g., `HIGH_EMI_TO_REVENUE_RATIO`, `INVALID_PAN_FORMAT`) back to the user interface.
