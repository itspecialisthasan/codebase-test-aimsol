namespace Test_CRUD_WebApi.CommonLayer.Model
{
    public class Product
    {
        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public string? ProductDescription { get; set; }
        public string? Price { get; set; }
        public string? Brand { get; set; }
        public string? Category { get; set; }
        public string? Cost { get; set; }
        public string? QuantityinStock { get; set; }

    }

    //public class CreateProductResponse
    //{
    //    public bool IsSuccess { get; set; }
    //    public string Message { get; set; }

    //}
}
