using Microsoft.AspNetCore.Mvc;
using VehicleLookup.Services;

namespace VehicleLookup.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VehicleController : ControllerBase
    {
        private readonly NhtsaService _nhtsaService;

        public VehicleController(NhtsaService nhtsaService)
        {
            _nhtsaService = nhtsaService;
        }

        [HttpGet("makes")]
        public async Task<IActionResult> GetAllMakes()
        {
            var makes = await _nhtsaService.GetAllMakesAsync();
            return Ok(makes);
        }

        [HttpGet("types/{makeId}")]
        public async Task<IActionResult> GetVehicleTypes(int makeId)
        {
            var types = await _nhtsaService.GetVehicleTypesForMakeAsync(makeId);
            return Ok(types);
        }

        [HttpGet("models/{makeId}/{year}")]
        public async Task<IActionResult> GetModels(int makeId, int year)
        {
            var models = await _nhtsaService.GetModelsAsync(makeId, year);
            return Ok(models);
        }
    }
}