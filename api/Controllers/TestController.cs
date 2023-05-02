using System.Text.Json;
using exercise.Services;
using Microsoft.AspNetCore.Mvc;

namespace exercise.Controllers;

[ApiController]
[Route("[controller]")]
[Produces("application/json")]
public class TestController
{
    private MemberDataService service;

    public TestController(MemberDataService service)
    {
        this.service = service;
    }

    // Simple GET controller to check that things are wired up properly.
    // `curl http://localhost:5124/test` should return `"ok"`.
    [HttpGet]
    public string Get()
    {
        return "ok";
    }

    // Test member data output.  `curl http://localhost:5124/test/json` should
    // return the JSON data we're working with.
    [HttpGet("json")]
    public JsonDocument GetMemberJson()
        => service.MemberJson;
}
