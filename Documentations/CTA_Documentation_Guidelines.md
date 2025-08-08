
# CTA Documentation Guidelines

## Lead Generation CTAs

### 1. Free Property Appraisal

**Location:** Multiple pages (Home, Selling, Manage, etc.)
**Form Fields:**
- First Name
- Last Name
- Email
- Phone Number
- Property Address
- Property Type (House/Apartment/Townhouse/Other)
- Number of Bedrooms
- Number of Bathrooms
- Preferred Contact Method
- Best Time to Contact
- Additional Comments

**n8n Workflow:** 
1. Capture form submission and validate data
2. Store lead information in CRM database
3. Send automated confirmation email to client
4. Notify appraisal team via Slack/email
5. Create task in project management system
6. Schedule follow-up reminder for 24 hours
7. Send property appraisal report within 24-48 hours

---

### 2. Market Analysis Report

**Location:** Home page, Selling pages
**Form Fields:**
- First Name
- Last Name
- Email
- Phone Number
- Property Address
- Suburb of Interest
- Investment Goals (Personal Use/Investment/Both)
- Timeline (Immediate/3-6 months/6-12 months/12+ months)

**n8n Workflow:**
1. Process form data and store in database
2. Generate automated market analysis report
3. Send confirmation email with report attached
4. Add contact to marketing email list
5. Schedule follow-up call within 48 hours
6. Track engagement with report content

---

### 3. Get Rental Appraisal

**Location:** Property Management pages, Manage section
**Form Fields:**
- First Name
- Last Name
- Email
- Phone Number
- Property Address
- Property Type
- Current Rental Status (Vacant/Tenanted/Owner-Occupied)
- Preferred Rent Amount (if known)
- Property Features (Pool/Garage/Garden/etc.)
- Available Date

**n8n Workflow:**
1. Store rental appraisal request in database
2. Send automated acknowledgment email
3. Assign to rental appraisal specialist
4. Conduct market research and analysis
5. Prepare comprehensive rental report
6. Schedule property inspection if needed
7. Deliver report within 24 hours
8. Follow up with rental management proposal

---

### 4. Book Consultation

**Location:** Speak Specialist page, various CTA sections
**Form Fields:**
- First Name
- Last Name
- Email
- Phone Number
- Consultation Type (Buying/Selling/Renting/Property Management/Investment)
- Preferred Date
- Preferred Time
- Meeting Preference (In-person/Phone/Video Call)
- Specific Questions or Topics
- How did you hear about us?

**n8n Workflow:**
1. Validate and store consultation request
2. Check specialist availability
3. Send calendar invitation to client
4. Confirm appointment via email and SMS
5. Add to CRM with consultation notes
6. Send preparation materials to client
7. Set reminder notifications for specialist
8. Post-consultation follow-up sequence

---

### 5. Book Private Inspection

**Location:** app/buying/open-homes/page.tsx
**Form Fields:**
- First Name
- Last Name
- Email
- Phone Number
- Selected Property for Inspection
- Preferred Date
- Preferred Time
- Number of Attendees
- Specific Requirements
- Current Situation (First Home Buyer/Upgrading/Investor)

**n8n Workflow:**
1. Store inspection request in database
2. Check property availability
3. Notify assigned realtor immediately
4. Send confirmation email to client
5. Add to property showing calendar
6. Send reminder notifications 24 hours prior
7. Collect post-inspection feedback
8. Follow up with property information pack

---

## Search and Browse CTAs

### 6. Search Properties

**Location:** Home page, Buying section
**Form Fields:**
- Location/Suburb
- Property Type
- Price Range (Min/Max)
- Number of Bedrooms
- Number of Bathrooms
- Property Features
- Keywords

**n8n Workflow:**
1. Process search criteria
2. Generate matching property results
3. Store search preferences in user profile
4. Send automated property alerts
5. Track search behavior for insights
6. Follow up with personalized recommendations

---

### 7. Search Rentals

**Location:** Renting page
**Form Fields:**
- Preferred Locations
- Price Range (Weekly)
- Property Type
- Number of Bedrooms
- Number of Bathrooms
- Move-in Date
- Lease Duration
- Pet Requirements

**n8n Workflow:**
1. Save rental search criteria
2. Set up automated property alerts
3. Send welcome email with rental guide
4. Schedule follow-up call from rental team
5. Track application readiness
6. Provide rental application support

---

### 8. Property Match Service

**Location:** Buying pages
**Form Fields:**
- First Name
- Last Name
- Email
- Phone Number
- Budget Range
- Preferred Suburbs (up to 5)
- Property Type Preferences
- Must-Have Features
- Deal Breakers
- Timeline to Purchase

**n8n Workflow:**
1. Create detailed buyer profile
2. Set up automated property matching
3. Assign dedicated buyer's agent
4. Send curated property suggestions weekly
5. Track property viewing feedback
6. Adjust matching criteria based on feedback
7. Provide market updates and insights

---

## Information and Resource CTAs

### 9. Download Selling Guide

**Location:** Selling pages
**Form Fields:**
- First Name
- Last Name
- Email
- Phone Number
- Property Location
- Selling Timeline
- Reason for Selling

**n8n Workflow:**
1. Deliver selling guide PDF immediately
2. Add to seller nurture email sequence
3. Schedule follow-up call within 3 days
4. Send market update emails
5. Track guide engagement
6. Offer free property appraisal

---

### 10. Subscribe to Newsletter

**Location:** Blog page
**Form Fields:**
- First Name
- Last Name
- Email
- Interests (Buying/Selling/Renting/Investing)
- Preferred Content Frequency

**n8n Workflow:**
1. Add to newsletter mailing list
2. Send welcome email with recent content
3. Segment based on interests
4. Send personalized content recommendations
5. Track engagement metrics
6. Upgrade engaged subscribers to VIP list

---

## Application and Process CTAs

### 11. Apply Now / Apply Online

**Location:** app/renting/apply-now/page.tsx
**Form Fields:**
- Personal Information (Name, DOB, Contact)
- Current Address and Rental History
- Employment Information
- Income Details
- Property Preferences
- References (Previous Landlord, Character)
- Supporting Documents Upload

**n8n Workflow:**
1. Process complete rental application
2. Verify document completeness
3. Send acknowledgment to applicant
4. Notify property manager
5. Conduct reference checks
6. Credit and background verification
7. Application decision within 48 hours
8. Lease preparation if approved

---

### 12. Report Issue / Maintenance Request

**Location:** Renting pages
**Form Fields:**
- Tenant Name
- Property Address
- Contact Information
- Issue Category (Urgent/Routine/Cosmetic)
- Detailed Description
- Photo Upload
- Preferred Contact Time
- Access Instructions

**n8n Workflow:**
1. Categorize maintenance request
2. Assign priority level
3. Notify property manager
4. Schedule appropriate tradesperson
5. Send updates to tenant
6. Confirm completion
7. Follow up on satisfaction
8. Update property maintenance records

---

## Contact and Communication CTAs

### 13. Send Message

**Location:** app/contact/page.tsx
**Form Fields:**
- First Name
- Last Name
- Email
- Phone Number
- Subject/Inquiry Type
- Message
- Preferred Contact Method
- Best Time to Contact

**n8n Workflow:**
1. Route inquiry to appropriate department
2. Send auto-confirmation to sender
3. Assign to team member within 1 hour
4. Response within 24 hours guaranteed
5. Track resolution time
6. Follow up on satisfaction
7. Add to CRM for future reference

---

### 14. Call (07) 3000 0000

**Location:** Multiple pages (10+ instances)
**Form Fields:** N/A (Direct phone contact)

**n8n Workflow:**
1. Log incoming call details
2. Route to available specialist
3. Capture caller information in CRM
4. Record call purpose and outcome
5. Schedule follow-up if needed
6. Send follow-up email with discussion summary

---

### 15. Contact Our Team

**Location:** Team page
**Form Fields:**
- First Name
- Last Name
- Email
- Phone Number
- Preferred Team Member (optional)
- Service Interest
- Message

**n8n Workflow:**
1. Route to specified team member or general queue
2. Send acknowledgment email
3. Assign based on expertise and availability
4. Response within 24 hours
5. Schedule meeting if requested
6. Add to team member's contact list

---

## Investment and Advisory CTAs

### 16. Get Investment Advice

**Location:** app/manage/investing-tips/page.tsx
**Form Fields:**
- First Name
- Last Name
- Email
- Phone Number
- Investment Experience Level
- Budget Range
- Investment Goals
- Risk Tolerance
- Timeline
- Preferred Investment Areas

**n8n Workflow:**
1. Assess investor profile and goals
2. Schedule consultation with investment specialist
3. Prepare personalized investment strategy
4. Send investment guide and market reports
5. Provide ongoing market updates
6. Track investment journey and outcomes

---

### 17. Get Market Report / Speak to Expert

**Location:** app/manage/suburb-profiles/page.tsx
**Form Fields:**
- First Name
- Last Name
- Email
- Phone Number
- Suburbs of Interest
- Report Type (Buying/Selling/Investment)
- Specific Questions

**n8n Workflow:**
1. Generate suburb-specific market report
2. Assign local area expert
3. Send comprehensive market analysis
4. Schedule expert consultation call
5. Provide ongoing suburb updates
6. Track market inquiry patterns

---

## Implementation Notes

### Form Validation Rules:
- All names: Minimum 2 characters, alphabetic only
- Email: Valid email format, verify deliverability
- Phone: Australian format validation (+61 or 07/08/09)
- Required fields marked with asterisk (*)

### Data Storage:
- All submissions stored in encrypted database
- GDPR/Privacy Act compliant data handling
- Automatic data retention policies
- Lead scoring and segmentation

### Response Times:
- Immediate: Automated confirmations
- 1 Hour: High-priority inquiries
- 24 Hours: Standard response guarantee
- 48 Hours: Complex requests (appraisals, applications)

### Integration Requirements:
- CRM system integration
- Email marketing platform
- Calendar scheduling system
- Document management system
- SMS notification service
- Analytics and reporting tools

### Success Metrics:
- Form completion rates
- Response times
- Conversion rates
- Customer satisfaction scores
- Lead quality scores
- Revenue attribution per CTA
