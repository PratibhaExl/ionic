


import { MongoClient, Filter, Document, ObjectId } from 'mongodb';

async function FetchCampaignDetails(fetchInfo: Filter<Document> = {}): Promise<Document[]> {
    try {
        const db = await mongoDB(); // Assuming mongoDB is a function returning a connected DB instance
        const campaignCollection = db.collection('CampaignDetails');
        const workflowCollection = db.collection('WorkflowDetails');

        // Convert _id to ObjectId if it's present in fetchInfo and it's a string
        if (fetchInfo._id && typeof fetchInfo._id === 'string') {
            fetchInfo._id = new ObjectId(fetchInfo._id);
        }

        // Add the IsActive condition to the query for Table A
        const query = { ...fetchInfo, IsActive: true };

        // Fetch records from Table A (CampaignDetails)
        let campaignData = await campaignCollection.find(query).toArray();

        // If no specific _id is provided or no records were found, fetch all active records
        if (!fetchInfo._id || campaignData.length === 0) {
            campaignData = await campaignCollection.find({ IsActive: true }).toArray();
        }

        // Enrich CampaignData with workflowName from Table B (WorkflowDetails)
        for (let campaign of campaignData) {
            if (campaign.detailId) {
                const workflow = await workflowCollection.findOne({ detailId: campaign.detailId, IsActive: true });
                if (workflow && workflow.workflowName) {
                    campaign.workflowName = workflow.workflowName;
                }
            }
        }

        return campaignData;

    } catch (error) {
        console.error('Error fetching campaign details:', error);
        throw new Error('Failed to fetch campaign details');
    }
}

//usage-

const campaignDetails = await FetchCampaignDetails({ _id: "64cda1e7f1b2b8a5d6e56c8a" });
const allActiveCampaigns = await FetchCampaignDetails();
const filteredCampaigns = await FetchCampaignDetails({ campaignName: "Summer Sale" });


    


