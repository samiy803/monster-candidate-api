import { SearchRequest, SearchResponse } from "./search";
import { CandidateDetails } from "./candidate";

/**
 * A class to search for candidates. This class handles authentication and
 * searching for candidates. It uses the Monster API to search for candidates.
 * 
 * @beta
 */
class CandidateSearchAPI {
    private clientId: string;
    private clientSecret: string;
    private accessToken: string | null = null;
    private accessTokenExpiry: number | null = null;

    /**
     * Constructs a new CandidateSearchAPI.
     *
     * @param clientId - The client ID.
     * @param clientSecret - The client secret.
     */
    constructor(clientId: string, clientSecret: string) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }

    /**
     * Gets an access token.
     *
     * @returns The access token.
     */
    private async getAccessToken(): Promise<string | null> {
        if (
            this.accessToken &&
            this.accessTokenExpiry &&
            this.accessTokenExpiry > Date.now()
        ) {
            return this.accessToken;
        }

        const response = await fetch(
            "https://sso.monster.com/core/connect/token",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `client_id=${this.clientId}&client_secret=${this.clientSecret}&scope=GatewayAccess&grant_type=client_credentials`,
            }
        );

        const data = await response.json();
        this.accessToken = data.access_token;
        this.accessTokenExpiry = Date.now() + data.expires_in * 1000;

        return this.accessToken;
    }

    /**
     * Performs a search for candidates.
     * 
     * @param searchRequest - The search request to perform.
     * @param page - Page number to be retrieved.. Default is 1.
     * @param perPage - Items per page. Default is 20. The maximum is 1000.
     * @param verbose - If true, some extra information will be included in the response.
                        The original request (as passed by the caller) is included as the originalCriteria property.
                        If the original request was of jobDetail type, an object called searchCriteria is also returned.
                        This contains a property called equivalentSemanticSearch. This is the actual request used internally (having extracted skill information from the job title and description).
                        If the original request was a jobDetail type that used jobId, then two extra text fields (jobTitle and jobDescription) record the information about the job at the time the request was made.
                        Default is false.
     * 
     * @returns The search response. This will contain a list of candidates. The list may be empty.
     */
    async searchCandidates(
        searchRequest: SearchRequest,
        page = 1,
        perPage = 20,
        verbose = false
    ): Promise<SearchResponse> {
        const accessToken = await this.getAccessToken();
        const url = new URL("https://api.jobs.com/v2/candidates/queries");
        url.searchParams.append("page", page.toString());
        url.searchParams.append("perPage", perPage.toString());
        url.searchParams.append("verbose", verbose.toString());

        const response = await fetch(url.toString(), {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(searchRequest),
        });

        return await response.json();
    }

    /**
     *
     * @param textResumeId - Text resume ID of the candidate. This ID is found in the search response. Default is 1.
     * @param resumeBoardId - The ID of the Board to get the candidate from. Default is 1.
     * @param verbose - If true it will include the text resume and the actual resume document in the response, in base 64 format. Default is false.
     *
     * @returns The candidate details. This will contain the candidate's details. The details may be empty.
     */
    async getCandidateDetails(
        textResumeId: string,
        resumeBoardId = 1,
        verbose = false
    ): Promise<CandidateDetails> {
        const accessToken = await this.getAccessToken();
        const url = new URL(
            `https://api.jobs.com/v2/candidates/${textResumeId}`
        );
        url.searchParams.append("resumeBoardId", resumeBoardId.toString());
        url.searchParams.append("verbose", verbose.toString());

        const response = await fetch(url.toString(), {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return await response.json();
    }
}

export { CandidateSearchAPI };
export * from "./search";
export * from "./candidate";
export * from "./skill";