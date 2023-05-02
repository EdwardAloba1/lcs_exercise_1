using System.Text.Json;
using System.Xml;
using Newtonsoft.Json;

namespace exercise.Services;

public class MemberDataService
{
    private const string MEMBER_DATA_URL = "http://clerk.house.gov/xml/lists/MemberData.xml";

    public MemberDataService()
    {
        // Load the XML data from the web
        this.MemberXml = LoadMemberData();

        // Apply a standard XML => JSON conversion
        this.MemberData = JsonConvert.SerializeXmlNode(this.MemberXml);

        // Convert the JSON text to JSON objects
        this.MemberJson = JsonDocument.Parse(this.MemberData);
    }

    public XmlNode MemberXml { get; init; }
    public string MemberData { get; init; }
    public JsonDocument MemberJson { get; init; }

    // Load live MemberData.xml data from http://clerk.house.gov/
    private XmlNode LoadMemberData()
    {
        var doc = new XmlDocument();
        doc.Load(MEMBER_DATA_URL);
        return doc;
    }
}
