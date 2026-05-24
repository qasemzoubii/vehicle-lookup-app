using VehicleLookup.Models;
using System.Text.Json;

namespace VehicleLookup.Services
{
    public class NhtsaService
    {
        private readonly HttpClient _httpClient;
        private const string BaseUrl = "https://vpic.nhtsa.dot.gov/api/vehicles";

        public NhtsaService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<List<MakeResult>> GetAllMakesAsync()
        {
            var response = await _httpClient.GetStringAsync($"{BaseUrl}/getallmakes?format=json");
            var result = JsonSerializer.Deserialize<NhtsaResponse<MakeResult>>(response);
            return result?.Results ?? new List<MakeResult>();
        }

        public async Task<List<VehicleTypeResult>> GetVehicleTypesForMakeAsync(int makeId)
        {
            var response = await _httpClient.GetStringAsync($"{BaseUrl}/GetVehicleTypesForMakeId/{makeId}?format=json");
            var result = JsonSerializer.Deserialize<NhtsaResponse<VehicleTypeResult>>(response);
            return result?.Results ?? new List<VehicleTypeResult>();
        }

        public async Task<List<ModelResult>> GetModelsAsync(int makeId, int year)
        {
            var response = await _httpClient.GetStringAsync($"{BaseUrl}/GetModelsForMakeIdYear/makeId/{makeId}/modelyear/{year}?format=json");
            var result = JsonSerializer.Deserialize<NhtsaResponse<ModelResult>>(response);
            return result?.Results ?? new List<ModelResult>();
        }
    }
}