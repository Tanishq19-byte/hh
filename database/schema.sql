-- FoodVigil — PostgreSQL / Supabase Database Schema
-- Consumer Food Safety & Transparency Platform

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'consumer',
    awareness_score INT DEFAULT 100,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Businesses Table
CREATE TABLE IF NOT EXISTS businesses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    registered_address TEXT,
    state VARCHAR(100),
    verification_status VARCHAR(50) DEFAULT 'verified',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Licenses Table (FSSAI Verification)
CREATE TABLE IF NOT EXISTS licenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    license_number VARCHAR(14) UNIQUE NOT NULL,
    business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
    business_name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    status VARCHAR(50) NOT NULL, -- Active, Expired, Suspended, Under Review
    issued_date DATE,
    expiry_date DATE,
    address TEXT,
    is_demo BOOLEAN DEFAULT FALSE,
    verified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Products Catalog
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_name VARCHAR(255) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    fssai_license_number VARCHAR(14) REFERENCES licenses(license_number),
    barcode VARCHAR(100),
    manufacturer_info TEXT,
    net_weight VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Food Additive Codes (E-Numbers / INS Codes)
CREATE TABLE IF NOT EXISTS food_codes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL, -- e.g. E621, INS 102
    name VARCHAR(255) NOT NULL,
    purpose VARCHAR(255),
    simple_explanation TEXT,
    safety_category VARCHAR(50) CHECK (safety_category IN ('Informational', 'Attention', 'High attention')),
    consumer_note TEXT
);

-- 6. Ingredients Breakdown
CREATE TABLE IF NOT EXISTS ingredients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    is_additive BOOLEAN DEFAULT FALSE,
    additive_code VARCHAR(50) REFERENCES food_codes(code),
    allergen_type VARCHAR(100)
);

-- 7. Scans & Label Analysis Log
CREATE TABLE IF NOT EXISTS scans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    image_url TEXT,
    extracted_raw_text TEXT,
    status VARCHAR(50) DEFAULT 'completed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Scan Results Detail
CREATE TABLE IF NOT EXISTS scan_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scan_id UUID REFERENCES scans(id) ON DELETE CASCADE,
    product_name VARCHAR(255),
    overall_status VARCHAR(50) CHECK (overall_status IN ('Good', 'Needs Attention', 'Important Information')),
    ingredients_json JSONB,
    additives_json JSONB,
    allergens_json JSONB,
    nutrition_json JSONB,
    license_number VARCHAR(14),
    license_verified BOOLEAN DEFAULT FALSE,
    ai_explanation TEXT,
    confidence_score NUMERIC(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Recalls Table
CREATE TABLE IF NOT EXISTS recalls (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_name VARCHAR(255) NOT NULL,
    manufacturer VARCHAR(255),
    batch_number VARCHAR(100),
    reason TEXT NOT NULL,
    severity VARCHAR(50) CHECK (severity IN ('Urgent', 'Warning', 'Info')),
    region VARCHAR(100),
    source VARCHAR(255),
    source_url TEXT,
    recalled_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Safety Alerts Table
CREATE TABLE IF NOT EXISTS safety_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    summary TEXT NOT NULL,
    severity VARCHAR(50) CHECK (severity IN ('High', 'Medium', 'Low')),
    affected_regions VARCHAR(255),
    advisory_source VARCHAR(255),
    published_date DATE NOT NULL
);

-- 11. Reports Table (Consumer Safety Submissions)
CREATE TABLE IF NOT EXISTS reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_reference VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    issue_type VARCHAR(100) NOT NULL, -- Adulteration, Mislabelled, Expired, Damaged, Suspicious Business, Food Poisoning, Other
    product_name VARCHAR(255) NOT NULL,
    brand VARCHAR(255),
    business_name VARCHAR(255),
    purchase_date DATE,
    location TEXT,
    batch_number VARCHAR(100),
    fssai_number VARCHAR(14),
    description TEXT NOT NULL,
    checklist_status JSONB,
    status VARCHAR(50) DEFAULT 'Submitted', -- Submitted, Under Review, Escalated to Authority, Closed
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. Evidence Vault Table
CREATE TABLE IF NOT EXISTS evidence (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(100) NOT NULL, -- photo, label, bill, document
    file_url TEXT NOT NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
