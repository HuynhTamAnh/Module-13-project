const gundams = [
  {
    id: "product1",
    img1: "/assets/images/product1.jpg",
    name: "Daban 1/100 MG Infinity Justice Gundam",
    price: "680,000VNĐ",
  },

  {
    id: "product2",
    img1: "https://gundamshop.vn/wp-content/uploads/2023/04/6843e4d2-81c4-48e5-8ea6-797ae8916e53.jpg",
    name: "Daban MG 6632 1/100 Gundam Star Build Strike",
    price: "820,000VNĐ",
  },

  {
    id: "product3",
    img1: "https://gundamshop.vn/wp-content/uploads/2020/12/HTB1qVb8IpXXXXaqXXXXq6xXFXXXE.jpg",
    name: "DABAN 1/100 MG SAZABI VER.KA",
    price: "1,080,000VNĐ",
  },

  {
    id: "product4",
    img1: "https://gundamshop.vn/wp-content/uploads/2021/05/DABAN-8808-Gundam-m-u-MG-1-100-GN-HS-A01-Avalanche-EXIA-Di-ng-Ph-768x768.jpg",
    name: "Daban 8808 1/100 MG Avalanche Exia Dash",
    price: "1,050,000VNĐ",
  },

  {
    id: "product5",
    img1: "https://gundamshop.vn/wp-content/uploads/2020/12/hg_barbatos046.jpg",
    name: "HG Gundam Barbatos-Gundam Chính hãng Bandai",
    price: "530,000VNĐ",
  },
];

function load() {
  var out = "";
  for (let i = 0; i < gundams.length; i++) {
    out += `<div class="col-md-3 mb-4 d-flex justify-content-center">
      <div class="card" style="width: 18rem;">
          <img src="${gundams[i].img1}" class="card-img-top" alt="Product 1 Image" style="height: 300px;")" >
          <div class="card-body">
              <h5 class="card-title">${gundams[i].name}</h5>
              <hr>

              <div class = "card-bottom">
              <p class="card-text">${gundams[i].price}</p>
              <button class="btn btn-primary add-to-cart-btn" data-id="product1" data-image="https://gundamshop.vn/wp-content/uploads/2021/05/M%C3%B4-h%C3%ACnh-MG-ZGMF-X19A-Infinite-Justice-Gundam-Bandai-6.jpg" class="buttonAdd"  onclick="renderProductItem('${gundams[i].id}')">More information...</button>
              </div> 
             </div>
      </div>
    </div>`;
  }
  document.getElementById("load").innerHTML = out;
}

// Hàm kiểm tra trạng thái đăng nhập của người dùng
function checkLoggedIn() {
  // Thực hiện các kiểm tra để xác định trạng thái đăng nhập của người dùng
  // Ví dụ: kiểm tra xem có thông tin đăng nhập của người dùng trong localStorage không
  const userEmail = localStorage.getItem("userEmail");
  if (userEmail) {
    // Nếu đã đăng nhập, trả về true
    return true;
  } else {
    // Ngược lại, trả về false
    return false;
  }
}

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let productToAdd = gundams.find((product) => product.id === id);

  console.log("cart", cart);

  // if (!productToAdd) {
  //   alert("Sản phẩm không tồn tại.");
  //   return;
  // }

  let existingProduct = cart.find((product) => product.id == productToAdd.id);

  if (existingProduct) {
    // Sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng
    existingProduct.quantity += 1;
  } else {
    console.log("productToAdd", productToAdd);
    // Sản phẩm chưa tồn tại trong giỏ hàng, thêm mới vào
    productToAdd.quantity = 1; // Thiết lập số lượng ban đầu là 1
    cart.push(productToAdd);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Sản phẩm đã được cập nhật trong giỏ hàng.");
}

function renderProductItem(id) {
  const isLoggedIn = checkLoggedIn();
  if (isLoggedIn) {
    const product = gundams.find((p) => p.id === id);
    if (product) {
      window.location.href = "/pages/thongtinsanpham.html";
      // Tạo một div mới để chứa thông tin chi tiết sản phẩm
      const productDetailDiv = document.createElement("div");
      productDetailDiv.classList.add("container");
      productDetailDiv.innerHTML = `
        <div class="left">
          <img src="${product.img1}" alt="Ảnh sản phẩm">
        </div>
        <div class="right">
          <h2>${product.name}</h2><hr>
          <h5>${product.price}</h5>
          <button onclick="addToCart('${product.id}')">Thêm vào giỏ hàng</button>
        </div>
      `;

      const mg1100Element = document.getElementById("mg1100");
      mg1100Element.innerHTML = "";

      // Thêm phần tử chứa thông tin chi tiết sản phẩm vào phần tử có id là "mg1100"
      mg1100Element.appendChild(productDetailDiv);
    } else {
      alert("Không tìm thấy sản phẩm!");
    }
  } else {
    alert("Vui lòng đăng nhập để xem thông tin chi tiết sản phẩm.");
  }
}

// Lấy thông tin chi tiết sản phẩm từ Local Storage
const product = JSON.parse(localStorage.getItem("cart"));

// Hiển thị thông tin chi tiết sản phẩm
if (product) {
  document.getElementById("mg1100").innerHTML = `
  <div class="container">
  <div class="left">
      <img src="https://gundamshop.vn/wp-content/uploads/2021/05/M%C3%B4-h%C3%ACnh-MG-ZGMF-X19A-Infinite-Justice-Gundam-Bandai-6.jpg" alt="ảnh gundam">
  </div>

  <div class="right">
      <h2>Daban 1/100 MG Infinity Justice Gundam</h2><hr>
      <h5>680,000VNĐ</h5>
      <button onclick="addToCart('${product.id}')" >Thêm vào giỏ hàng</button>
  </div>
</div>
    `;
} else {
  alert("Không có thông tin sản phẩm để hiển thị!");
}
