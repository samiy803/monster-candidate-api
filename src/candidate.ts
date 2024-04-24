import { Skill } from "./skill";

/**
 * Represents a candidate's experience.
 * @beta
 */
interface Experience {
    title: {
        name: string;
        matched: string;
    };
    company: {
        name: string;
        matched: string;
    };
    start: string;
    end: string;
}

/**
 * Represents a candidate's identity.
 * @beta
 */
interface Identity {
    seekerRefCode: string;
    textResumeID: string;
    resumeModifiedDate: string;
    md5EmailAddress: string;
    name: string;
}

/**
 * Represents a candidate's location details.
 * @beta
 */
interface LocationDetails {
    city: string;
    state: string;
    postalCode: string;
    country: string;
    willRelocate: boolean;
    workAuthorizations: {
        authorization: string;
        country: string;
    }[];
}

/**
 * Represents a candidate's skill.
 * @beta
 */
interface Relevance {
    score: number;
    experience: Experience;
    skills: Skill[];
}

/**
 * Represents a board.
 * @beta
 */
interface Board {
    id: number;
    name: string;
}

/**
 * Represents a candidate.
 * @beta
 */
interface Candidate {
    identity: Identity;
    location: LocationDetails;
    degree: string;
    yearsOfExperience: number;
    relevance: Relevance;
    veteran: boolean;
    viewed: boolean;
    lastActive: string;
    boards: Board[];
}

/**
 * Represents a candidate's details.
 * @beta
 */
interface CandidateDetails extends Candidate {
    resumeTitle: string;
    securityClearance: {
        country: string;
        clearance: string;
    };
    source: string;
    targetJobTitle: string;
    desiredSalary: {
        min: string;
        max: string;
        period: string;
        currency: string;
    };
    phoneNumbers: {
        phoneNumberValue: string;
        priority: string;
        type: string;
    }[];
    willTravel: boolean;
    highestEducationDegree: string;
    educationalHistory: {
        schoolName: string;
        degree: string;
        majors: string[];
        start: string;
        end: string;
    }[];
    externalRequisitions: string[];
    resumeModifiedDate: string;
    resume: string;
    resumeDocument: {
        fileName: string;
        fileContentType: string;
        file: string;
    };
}
export {
    CandidateDetails,
    Experience,
    Identity,
    LocationDetails,
    Relevance,
    Board,
    Candidate,
}; // all
