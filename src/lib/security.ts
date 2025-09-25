// Security utilities for DigiStore Nigeria
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface SanitizedInput {
  value: string;
  wasModified: boolean;
}

class SecurityService {
  // Input validation
  validateEmail(email: string): ValidationResult {
    const errors: string[] = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email || email.trim().length === 0) {
      errors.push('Email is required');
    } else if (!emailRegex.test(email)) {
      errors.push('Invalid email format');
    } else if (email.length > 254) {
      errors.push('Email is too long');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  validatePhone(phone: string): ValidationResult {
    const errors: string[] = [];
    const phoneRegex = /^(\+234|0)[789]\d{9}$/;
    
    if (!phone || phone.trim().length === 0) {
      errors.push('Phone number is required');
    } else if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      errors.push('Invalid Nigerian phone number format');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  validateName(name: string): ValidationResult {
    const errors: string[] = [];
    
    if (!name || name.trim().length === 0) {
      errors.push('Name is required');
    } else if (name.trim().length < 2) {
      errors.push('Name must be at least 2 characters');
    } else if (name.length > 100) {
      errors.push('Name is too long');
    } else if (!/^[a-zA-Z\s'-]+$/.test(name)) {
      errors.push('Name contains invalid characters');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Input sanitization
  sanitizeInput(input: string): SanitizedInput {
    const original = input;
    let sanitized = input;
    
    // Remove potentially dangerous characters
    sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    sanitized = sanitized.replace(/<[^>]*>/g, '');
    sanitized = sanitized.replace(/javascript:/gi, '');
    sanitized = sanitized.replace(/on\w+\s*=/gi, '');
    
    // Trim whitespace
    sanitized = sanitized.trim();
    
    return {
      value: sanitized,
      wasModified: original !== sanitized
    };
  }

  // Rate limiting (simple in-memory implementation)
  private rateLimitStore: Record<string, { count: number; resetTime: number }> = {};

  checkRateLimit(identifier: string, maxRequests: number = 10, windowMs: number = 60000): boolean {
    const now = Date.now();
    const key = identifier;
    
    if (!this.rateLimitStore[key]) {
      this.rateLimitStore[key] = { count: 1, resetTime: now + windowMs };
      return true;
    }
    
    const record = this.rateLimitStore[key];
    
    if (now > record.resetTime) {
      record.count = 1;
      record.resetTime = now + windowMs;
      return true;
    }
    
    if (record.count >= maxRequests) {
      return false;
    }
    
    record.count++;
    return true;
  }

  // Generate secure transaction reference
  generateSecureReference(prefix: string = 'DS'): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    const hash = this.simpleHash(`${timestamp}${random}`);
    return `${prefix}_${timestamp}_${hash}`;
  }

  private simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  // Validate payment amount
  validateAmount(amount: number): ValidationResult {
    const errors: string[] = [];
    
    if (!amount || amount <= 0) {
      errors.push('Amount must be greater than 0');
    } else if (amount > 10000000) { // 10 million naira limit
      errors.push('Amount exceeds maximum limit');
    } else if (!Number.isInteger(amount)) {
      errors.push('Amount must be a whole number');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Clean and validate product data
  validateProductData(data: Record<string, unknown>): ValidationResult {
    const errors: string[] = [];
    const requiredFields = ['name', 'price', 'category', 'description'];
    
    for (const field of requiredFields) {
      if (!data[field]) {
        errors.push(`${field} is required`);
      }
    }
    
    if (data.price && typeof data.price === 'number') {
      const amountValidation = this.validateAmount(data.price);
      if (!amountValidation.isValid) {
        errors.push(...amountValidation.errors);
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

export const securityService = new SecurityService();