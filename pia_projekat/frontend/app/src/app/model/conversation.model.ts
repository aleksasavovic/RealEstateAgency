export class Conversation{
    _id:string;
    buyer:string;
    seller:string;
    newestDate:Date;
    title:string;
    messages:Array<Object>;
    realEstateId:string;
    archivedBySeller:boolean;
    archivatedByBuyer:boolean;
    offerSent:boolean;
    offerAccepted:boolean;
    aprovedByAgent:boolean;
    seenByBuyer:boolean;
    seenBySeller:boolean;

}