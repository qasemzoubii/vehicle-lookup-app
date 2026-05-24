namespace VehicleLookup.Models
{
    public class MakeResult
    {
        public int Make_ID { get; set; }
        public string Make_Name { get; set; } = string.Empty;
    }

    public class VehicleTypeResult
    {
        public int VehicleTypeId { get; set; }
        public string VehicleTypeName { get; set; } = string.Empty;
    }

    public class ModelResult
    {
        public int Model_ID { get; set; }
        public string Model_Name { get; set; } = string.Empty;
        public int Make_ID { get; set; }
        public string Make_Name { get; set; } = string.Empty;
    }

    public class NhtsaResponse<T>
    {
        public int Count { get; set; }
        public string Message { get; set; } = string.Empty;
        public List<T> Results { get; set; } = new();
    }
}