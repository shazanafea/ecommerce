import React, { useContext, useEffect, useState } from "react";
import CartContextProvider, {
  CartContext,
} from "../../Context/CartContextProvider";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
export default function Cart() {
  let [cartData, setCartData] = useState(null);
  let {
    getUserCart,
    deleteUserCart,
    setNumCartItems,
    clearUserCart,
    updateCartItemCount,
  } = useContext(CartContext);
  let [loading, setLoading] = useState(true);
  let [loadingCount, setLoadingCount] = useState(false);
  useEffect(() => {
    getCartData();
  }, []);

  function getCartData() {
    setLoading(true);
    getUserCart()
      .then((req) => {
        setCartData(req.data.data);
        setLoading(false);
      })
      .catch((err) => {});
  }

  if (loading) {
    return (
      <div className="bg-slate-300 flex justify-center items-center h-screen">
        <span className="loader">Load&nbsp;ng</span>
      </div>
    );
  }

  function removeItem(id) {
    deleteUserCart(id)
      .then((req) => {
        setNumCartItems(req.data.numOfCartItems);
        setCartData(req.data.data);
        toast.success("product deleted successfully");
      })
      .catch((req) => {});
  }

  function clearItem() {
    clearUserCart()
      .then((req) => {
        if (req.data.message == "success") {
          setCartData(null);
          setNumCartItems(null);
          toast.success("Cart is cleared successfully");
        }
      })
      .catch(() => {});
  }

  function updateCount(id, count) {
    setLoadingCount(true);
    updateCartItemCount(id, count).then((req) => {
      setCartData(req.data.data);
    });
    setLoadingCount(false);
  }
  return (
    <>
      <Toaster />
      {cartData?.products.length > 0 ? (
        <div className="w-11/12 mx-auto my-5">
          <div className="bg-gray-200">
            <h1 className="text-2xl">shop cart</h1>
            <div className="flex justify-between">
              <h2 className="text-2xl text-green-500 ">
                Total Cart Price:{cartData.totalCartPrice}EGP
              </h2>
              <button
                onClick={clearItem}
                className="bg-red-600 text-white px-3 py-2 rounded "
              >
                Clear Cart
              </button>
            </div>
            <div className="divide-y-2 divide-gray-300">
              {cartData.products.map((item) => {
                return (
                  <div key={item._id} className="flex items-center p-3">
                    <div className="w-10/12">
                      <div className="flex">
                        <div className="w-1/12">
                          <img
                            src={item.product.imageCover}
                            className="w-full"
                            alt={item.title}
                          />
                        </div>

                        <div className="w-11/12">
                          <h2 className=" m-2">{item.product.title}</h2>
                          <h2 className="text-green-500 m-2">
                            price:{item.price}EGP
                          </h2>
                          <button
                            onClick={() => {
                              removeItem(item.product._id);
                            }}
                            className="border border-red-500 px-5 py-2  m-2 rounded text-red-500 hover:bg-red-500 hover:text-white"
                          >
                            <i className="fa-solid fa-trash-can mr-2"></i>Remove
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="w-2/12">
                      <i
                        onClick={() => {
                          updateCount(item.product._id, item.count + 1);
                        }}
                        className=" cursor-pointer fa-solid p-1 rounded border border-green-500 fa-plus"
                      ></i>
                      {loadingCount ? (
                        <i className="fa-solid fa-spinner fa-spin text-green-500"></i>
                      ) : (
                        <span className="m-2">{item.count} </span>
                      )}
                      <i
                        onClick={() => {
                          updateCount(item.product._id, item.count - 1);
                        }}
                        className=" cursor-pointer fa-solid p-1 rounded border border-green-500 fa-minus"
                      ></i>

                    </div>
                  </div>
                );
              })}
            </div>
            <Link to={'/ShippingDetails/'+cartData._id} className="btn block text-center">Pay <i className="fa-brands fa-cc-visa "></i></Link >
          </div>
        </div>
      ) : (
        <div className="bg-red-400 text-center">No Data</div>
      )}
    </>
  );
}
