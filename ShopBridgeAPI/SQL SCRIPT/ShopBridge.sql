/****** Object:  Table [dbo].[InventoryItem]    Script Date: 6/10/2022 3:22:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InventoryItem](
	[ProductId] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[ProductName] [nvarchar](500) NULL,
	[Description] [nvarchar](max) NULL,
	[Price] [decimal](18, 2) NULL,
	[ProductImage] [nvarchar](max) NULL,
 CONSTRAINT [PK_InventoryItem] PRIMARY KEY CLUSTERED 
(
	[ProductId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[USP_PRODUCT_Add]    Script Date: 6/10/2022 3:22:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[USP_PRODUCT_Add]      
	-- @UserId INT
	@ProductName NVARCHAR(100),
	@Description NVARCHAR(100),
	@Price DECIMAL,
	@ProductImage NVARCHAR(MAX),
	@ProductId INT OUT
        
AS      
    BEGIN   
	   
        INSERT INTO dbo.InventoryItem(ProductName,Description,Price,ProductImage)      
        VALUES  (@ProductName,@Description,@Price,@ProductImage);     
        SET @ProductId = SCOPE_IDENTITY();     
       
    END;   
GO
/****** Object:  StoredProcedure [dbo].[USP_PRODUCT_ById]    Script Date: 6/10/2022 3:22:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[USP_PRODUCT_ById]     
	@ProductId INT
AS  
BEGIN  
      
    SET NOCOUNT ON;  
    
	SELECT 
		P.ProductId,
		P.ProductName,
		P.Description,
		P.Price,
		P.ProductImage

	FROM dbo.InventoryItem P
	WHERE P.ProductId = @ProductId

    END
GO
/****** Object:  StoredProcedure [dbo].[USP_PRODUCT_Delete]    Script Date: 6/10/2022 3:22:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[USP_PRODUCT_Delete]     
	@ProductId INT
AS  
BEGIN  
      
    SET NOCOUNT ON;  
    
	DELETE FROM dbo.InventoryItem
	WHERE ProductId = @ProductId

    END
GO
/****** Object:  StoredProcedure [dbo].[USP_PRODUCT_List]    Script Date: 6/10/2022 3:22:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[USP_PRODUCT_List]    

	@p_SearchTerm VARCHAR(50),
	@p_SortColumn INT,
	@p_SortOrder VARCHAR(50),
	@p_PageNumber INT,
	@p_PageSize INT

AS  
BEGIN  
      
    SET NOCOUNT ON;  
	
	DECLARE @v_StartRow INT
	DECLARE @v_EndRow INT
			
	SET @p_SortColumn = LOWER(ISNULL(@p_SortColumn,''))
	SET @p_SortOrder = LOWER(ISNULL(@p_SortOrder,''));
	SET @v_StartRow = (@p_PageNumber-1); -- (p_PageNumber-1) * p_PageSize;
	SET @v_EndRow =  @p_PageSize;  -- (p_PageNumber * p_PageSize) + 1
			
	WITH CTEResult AS (
					SELECT  COUNT(P.ProductId) OVER () AS TotalCount
							,P.ProductId
							,P.ProductName
							,P.Description
							,P.Price
							,P.ProductImage
							,ROW_NUMBER() OVER (ORDER BY 
								CASE WHEN (@p_SortColumn = 0 AND @p_SortOrder='asc') THEN P.ProductId END ASC,
								CASE WHEN (@p_SortColumn = 0 AND @p_SortOrder='desc') THEN P.ProductId END DESC,
										
								CASE WHEN (@p_SortColumn = 2 AND @p_SortOrder='asc') THEN P.ProductName END ASC,
								CASE WHEN (@p_SortColumn = 2 AND @p_SortOrder='desc') THEN P.ProductName END DESC,

								CASE WHEN (@p_SortColumn = 3 AND @p_SortOrder='asc') THEN P.Price END ASC,
								CASE WHEN (@p_SortColumn = 3 AND @p_SortOrder='desc') THEN P.Price END DESC
							) AS RowNumber
					FROM dbo.InventoryItem P
					WHERE
					(
							(ISNULL(@p_SearchTerm,'') = '' OR P.ProductName LIKE  '%' + @p_SearchTerm + '%')
						 OR (ISNULL(@p_SearchTerm, '') = '' OR P.Price LIKE '%' + @p_SearchTerm + '%')
					)
					 
	)	
							
				SELECT 
							RowNumber, 
							TotalCount,
							ProductId,
							ProductName,
							Description,
							Price,
							ProductImage
							
				FROM CTEResult 
				WHERE RowNumber BETWEEN (@p_PageNumber -1) *  @p_PageSize + 1 AND (((@p_PageNumber -1) *  @p_PageSize + 1) + @p_PageSize)- 1
				
				
			
	
END
GO
/****** Object:  StoredProcedure [dbo].[USP_PRODUCT_Update]    Script Date: 6/10/2022 3:22:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[USP_PRODUCT_Update]  
	@ProductName VARCHAR(100),
    @Description NVARCHAR(MAX),
	@Price DECIMAL,
	@ProductImage NVARCHAR(MAX),
	@ProductId INT   
          
AS        
    BEGIN        
     UPDATE dbo.InventoryItem   
     SET    
			ProductName = @ProductName,
			Description = @Description,
			Price = @Price,
			ProductImage = @ProductImage
			
  
	WHERE ProductId = @ProductId   
    END;   
GO
