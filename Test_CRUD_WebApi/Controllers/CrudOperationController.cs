using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test_CRUD_WebApi.CommonLayer.Model;


namespace Test_CRUD_WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CrudOperationController : ControllerBase
    {
        public readonly ProductDbContext _productDbContext;

        public CrudOperationController(ProductDbContext productDbContext)
        {
            _productDbContext = productDbContext;
        }

        [HttpGet]
        [Route("GetProductList")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductList()
        {
            if(_productDbContext == null)
            {
                return NotFound();
            }

            return await _productDbContext.Products.ToListAsync();
        }

        [HttpGet]
        [Route("GetProductList/{id}")]
        public async Task<ActionResult<Product>> GetProductList(int id)
        {
            if (_productDbContext == null)
            {
                return NotFound();
            }

            var products = await _productDbContext.Products.FindAsync(id);
            if (products == null)
            {
                return NotFound();
            }

            return products;

        }

        [HttpPost]
        [Route("PostProduct")]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            _productDbContext.Products.Add(product);
            await _productDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProductList), new { id = product.ProductId }, product);
        }

        [HttpPut]
        [Route("UpdateProductById/{id}")]
        public async Task<ActionResult> UpdateProductById(int id, Product product)
        {
            if (id != product.ProductId)
            {
                return BadRequest();
            }

            _productDbContext.Entry(product).State = EntityState.Modified;

            try
            {
                await _productDbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return Ok();
        }

        [HttpDelete]
        [Route("DeleteProductById/{id}")]
        public async Task<ActionResult> DeleteProductById(int id)
        {
            if(_productDbContext == null)
            {
                return NotFound();
            }

            var productDeleteById = await _productDbContext.Products.FindAsync(id);
            if (productDeleteById == null)
            {
                return NotFound();
            }
            _productDbContext.Products.Remove(productDeleteById);
            await _productDbContext.SaveChangesAsync();

            return Ok();
        }

    }
}
