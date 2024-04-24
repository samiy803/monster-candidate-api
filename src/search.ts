import { Candidate } from "./candidate";

/**
 * Represents a location.
 */
interface Location {
    city?: string;
    state?: string;
    postalCode?: string;
    radius?: number;
    radiusUnit?: string;
    locationExpression?: string;
}

/**
 * Represents a salary.
 */
interface Salary {
    minimum?: number;
    maximum?: number;
    currencyAbbrev?: string;
    includeResumesWithoutSalary?: boolean;
}

/**
 * Represents a work authorization.
 */
interface WorkAuthorization {
    workStatus:
        | "AuthorizedToWorkForAnyEmployer"
        | "AuthorizedToWorkForPresentEmployer"
        | "RequireSponsorship";
    countryAbbrev: string;
}

/**
 * A preconfigured Monster custom field (containing its id and list of integer values).
 */
interface CustomField {
    id: number;
    values: number[];
}

/**
 * Represents a legal status.
 */
interface LegalStatus {
    legalStatusName: "Citizen" | "PermanentResident" | "Other";
    countryAbbrev: string;
}

/**
 * Represents a boolean expression written in Monster Query Syntax. E.g. "java AND (\"web services\" OR xml) AND program*".
 */
interface BooleanExpression {
    expression: string;
    importance?: "Required" | "NiceToHave";
}

/**
 * Represents years of experience.
 */
interface YearsOfExperience {
    expression: string;
    importance?: "Required" | "NiceToHave";
}

/**
 * Represents a security clearance.
 */
interface SecurityClearance {
    clearanceId: number;
    countryAbbrev: string;
}

/**
 * Represents a language proficiency level.
 */
interface LanguageProficiencyLevel {
    languageCode: string;
    proficiency:
        | "Unknown"
        | "Beginner"
        | "Intermediate"
        | "Advanced"
        | "Fluent";
}

/**
 * Represents a degree.
 */
interface Degree {
    degreeName: string;
    importance?: "Required" | "NiceToHave";
}

/**
 * Represents a skill query.
 *
 * **Note:** This is separate from the Skill interface in [skill.ts](./skill.ts).
 */
interface SkillQuery {
    name: string;
    importance?: "Required" | "NiceToHave";
}

/**
 * Represents a job detail.
 */
interface JobDetail {
    jobId?: string;
    jobTitle?: string;
    jobDescription?: string;
    jobDescriptionBase64?: string;
    locations?: Location[];
}

/**
 * Represents a search request.
 *
 * @param country - A single country abbreviation. E.g. US, UK, CA. Omitting country will search all countries and may have undesired results. The country parameter determines context and search behavior in two ways.
 * @param searchType - The type of search to perform. Either "JobDetail" or "Semantic". Unknown what the default is.
 * @param resumeBoardId - The resume board against which candidates will be matched. For every country the Monster Public Board is number 1. For private boards, Monster will provide the resumeBoardId.
 * @param jobDetail - The job detail to search for. Required if searchType is "JobDetail".
 * @param semantic - The semantic search criteria. Required if searchType is "Semantic".
 */
interface SearchRequest {
    country?: string;
    searchType: "JobDetail" | "Semantic";
    resumeBoardId?: number;
    jobDetail?: JobDetail;
    semantic?: Semantic;
}

/**
 * Represents a search response.
 */
interface SearchResponse {
    originalCriteria?: any;
    searchCriteria?: any;
    boards: {
        id: number;
        name: string;
        matched: number;
    }[];
    candidates: Candidate[];
}

/**
 * Represents a full function semantic search and hybrid semantic/Boolean search
 *
 * @param booleanExpression - The Boolean Keyword expression to use in the search. Logical operators include AND, OR, NOT, wildcards “*” and multi-word strings “Accounting Clerk”. Terms may be grouped using parentheses.
 * @param candidateName - Name of a single candidate to look for.
 * @param careerLevels - List of career levels to be filtered. Possible values are: "President", "ExecutiveLevel", "GeneralManager", "VicePresident", "Director", "Head", "Manager", "Lead", "Other", "Analyst", "Representative", "Specialist", "Clerk", "Coordinator", "Assistant"
 * @param channelId - Monster provided Channel ID for the search.
 * @param companies - A comma separated list of companies. (ex. “Lockheed”, “Raytheon”, “Northrup Grumman”)
 * @param customField - A preconfigured Monster custom field (containing its id and list of integer values).
 * @param degrees - A comma separated list of degrees with optional importance. (ex. “MBA”, “Computer Science”)
 * @param jobTenure - Average tenure for all jobs on a resume, specified in fractions of a year. E.g. 0.5 (means 6 months). 1 (means 1 year)
 * @param jobTitles - A comma separated list of Job Titles to search.
 * @param jobTypes - List of target job types by which to be filtered. Possible values are: "WantsPermanent", "WantsContract", "WantsIntern", "WantsTemp", "WantsSeasonal"
 * @param keywords - List of Keywords to consider in the search. All keywords must be present (logical AND). Ex.: “Software Engineer”, DevOps
 * @param languageProficiencyLevels - List of all language proficiency levels.
 * @param legalStatuses - List of all legal statuses composed of the country abbreviation and the legal status name.
 * @param locations - List of all locations to be included in search, composed of the city, state, postal code, and radius. It's also possible to provide a location expression.
 * @param minEducationLevel - Single education level by which to be filtered. This field is reasonably well populated by Monster users. Possible values are: "HighSchoolOrEquivalent", "Certification", "Vocational", "AssociateDegree", "BachelorsDegree", "MastersDegree", "Doctorate", "Professional", "SomeCollegeCourseworkCompleted", "SomeHighSchoolCoursework"
 * @param requisitionCodes - List of requisition codes. This usually refers to Job ID’s in the ATS the seeker has applied to. On occasion this field is used as a semi-custom field for other information. Populated by the resume feed.
 * @param resumeSourceIds - List of resume source IDs. Reference: https://integrations.monster.com/Toolkit/Enumeration/ResumeOrigin
 * @param lastActiveMaximumAge - Maximum time since the seeker was active on Monster (in minutes). Does not apply to private resume databases.
 * @param resumeUpdatedMaximumAge - Maximum time since resume was updated (in minutes).
 * @param resumeUpdatedMinimumAge - Minimum time since resume was updated (in minutes).
 * @param resumeValues - List of resume values. This provides direct search for an individual, unique resume.
 * @param salary - Candidate self-identified target salary related properties. This profile information is seldom provided and should not be considered as actual or current salary.
 * @param schools - A comma separated list of schools. (ex. “Harvard”, “Yale”, “UCLA”)
 * @param skills - List of all skills to be searched with an optional importance.
 * @param securityClearances - US only. List of all security clearances (composed of country id and clearance id). Reference clearance ID at https://integrations.monster.com/Toolkit/Enumeration/ClearanceLevel
 * @param seekerRefCodes - List of seeker RefCodes. This usually is the Candidate ID from the Applicant Tracking System (ATS) as provided in the resume upload integration.
 * @param veteranCandidates - Flag to indicate whether to look only for (military) veteran candidates.
 * @param willingnessToRelocate - Flag indicating the candidate's willingness to relocate.
 * @param willingnessToTravel - Willingness to travel. Possible values: "NoTravelRequired", "UpTo25PercentTravel", "UpTo50PercentTravel", "UpTo75PercentTravel", "OneHundredPercentTravel"
 * @param workAuthorizations - List of work authorizations by country.
 * @param yearsOfExperience - Expression to describe the number of years’ experience for the search. Calculated from date ranges in the work history section of the resume. Accepted format: Single number of years (Ex.: "1"); or Range of years (Ex.: "1-5" inclusive); or Greater than expression (Ex.: “\>5”); or Greater than expression (Ex.: "5+" encoded as "5%2b"); or Less than expression (Ex.: "\<3", "\<8").
 */
interface Semantic {
    booleanExpression?: BooleanExpression;
    candidateName?: string;
    careerLevels?: string[];
    channelId?: number;
    companies?: string[];
    customField?: CustomField;
    degrees?: Degree[];
    jobTenure?: number;
    jobTitles?: string[];
    jobTypes?: string[];
    keywords?: string[];
    languageProficiencyLevels?: LanguageProficiencyLevel[];
    legalStatuses?: LegalStatus[];
    locations?: Location[];
    minEducationLevel?:
        | "HighSchoolOrEquivalent"
        | "Certification"
        | "Vocational"
        | "AssociateDegree"
        | "BachelorsDegree"
        | "MastersDegree"
        | "Doctorate"
        | "Professional"
        | "SomeCollegeCourseworkCompleted"
        | "SomeHighSchoolCoursework";
    requisitionCodes?: string[];
    resumeSourceIds?: number[];
    lastActiveMaximumAge?: number;
    resumeUpdatedMaximumAge?: number;
    resumeUpdatedMinimumAge?: number;
    resumeValues?: string[];
    salary?: Salary;
    schools?: string[];
    skills?: SkillQuery[];
    securityClearances?: SecurityClearance[];
    seekerRefCodes?: string[];
    veteranCandidates?: boolean;
    willingnessToRelocate?: boolean;
    willingnessToTravel?:
        | "NoTravelRequired"
        | "UpTo25PercentTravel"
        | "UpTo50PercentTravel"
        | "UpTo75PercentTravel"
        | "OneHundredPercentTravel";
    workAuthorizations?: WorkAuthorization[];
    yearsOfExperience?: YearsOfExperience;
}

export { SearchRequest, SearchResponse, Semantic };
