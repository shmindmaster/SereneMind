# SereneMind – AI-Powered Mental Health & Wellness Companion

## Overview

SereneMind is an AI-powered mental health and wellness platform designed for individuals and small mental health practices. The platform provides accessible mental health support through AI-guided resources, personalized wellness recommendations, and therapeutic tools that complement traditional therapy.

Built specifically for startups and small-to-medium mental health practices, SereneMind democratizes access to mental health resources while maintaining the human touch essential for effective care. The platform leverages Azure AI to provide intelligent, empathetic interactions that support both clients and practitioners.

**Demo**: https://serenemind.shtrial.com

## Key Features

- **AI-Guided Support**: Intelligent, empathetic conversations powered by Azure OpenAI that provide immediate support and resources
- **Personalized Wellness Plans**: AI-generated wellness recommendations based on individual needs and preferences
- **Mood Tracking & Analytics**: Intelligent mood tracking with pattern recognition and insights
- **Resource Library**: Curated mental health resources with AI-powered search and recommendations
- **Practice Management Tools**: For small practices, featuring client management and session tracking
- **Privacy-First Design**: HIPAA-compliant architecture ensuring client data security

## Architecture

### Technology Stack

> **Current repo vs target architecture**: This repository contains the **Next.js frontend** only. The Node/Express, Postgres, and Azure AI pieces below describe the **target backend architecture** running on the shared MahumTech platform.

- **Frontend (current repo)**: Next.js 13.5 App Router, React 18, TypeScript, Tailwind CSS (static export)
- **Backend (target)**: Node.js, Express/FastAPI, TypeScript running behind secure APIs
- **Database (target)**: Azure Database for PostgreSQL with pgvector
- **AI Services (target)**: Azure OpenAI (Responses API), Azure AI Search
- **Storage (target)**: Azure Blob Storage
- **Authentication (target)**: NextAuth.js / Custom JWT
- **Deployment**: Azure Static Web Apps (frontend) + Azure App Service / Container Apps (backend)

### Shared Azure Infrastructure

SereneMind leverages shared Azure AI resources from `rg-shared-ai`:

- **Azure OpenAI**: `shared-openai-eastus2` for conversational AI and content generation
- **Azure AI Search**: `shared-search-eastus2` for intelligent resource discovery
- **PostgreSQL with pgvector**: Shared database in `rg-shared-ai` for vector embeddings
- **Azure Storage**: Shared storage account for media and documents

## Configuration & Environment

### Required Environment Variables

```env
# Azure OpenAI Configuration
AZURE_OPENAI_ENDPOINT=https://shared-openai-eastus2.openai.azure.com/
AZURE_OPENAI_API_KEY=your_api_key
AZURE_OPENAI_DEPLOYMENT=gpt-4o
AZURE_OPENAI_API_VERSION=2024-02-15-preview

# Azure AI Search
AZURE_SEARCH_ENDPOINT=https://shared-search-eastus2.search.windows.net
AZURE_SEARCH_API_KEY=your_search_key
AZURE_SEARCH_INDEX_NAME=serenemind-index

# Database Configuration
DB_SERVER_HOST=your-postgres-server.postgres.database.azure.com
DB_NAME=serenemind
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_CONNECTION_STRING=postgresql://user:password@host:5432/database

# Azure Storage
AZURE_STORAGE_ACCOUNT=your_storage_account
AZURE_STORAGE_CONTAINER=serenemind-media
AZURE_STORAGE_CONNECTION_STRING=your_connection_string

# Application
NEXT_PUBLIC_APP_URL=https://serenemind.shtrial.com
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=https://serenemind.shtrial.com
```

**Note**: Secrets should be stored in Azure Key Vault or GitHub Secrets, never committed to git.

## Getting Started (Local Development)

### Prerequisites

- Node.js 20+
- pnpm package manager
- Azure subscription with access to shared resources

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/shmindmaster/SereneMind.git
cd SereneMind
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Configure environment**

```bash
cp .env.example .env.local
# Edit .env.local with your Azure service credentials
```

4. **Start development server**

```bash
pnpm dev
```

The application will be available at `http://localhost:3000` (or the port specified in your config).

## Use Cases & Roadmap

### Current Use Cases

- **Individual Users**: Access to AI-guided mental health support and wellness resources
- **Small Practices**: Client management and session tracking tools
- **Wellness Coaches**: Platform for delivering digital wellness programs

### Planned Enhancements

- **Advanced AI Therapy Tools**: More sophisticated therapeutic conversation capabilities
- **Integration with Wearables**: Health data integration for holistic wellness tracking
- **Group Support Features**: AI-moderated support groups and community features
- **Telehealth Integration**: Video consultation scheduling and management
- **Insurance Integration**: Claims processing and coverage verification

## License

Proprietary - All rights reserved
