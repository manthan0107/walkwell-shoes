import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";

const categoriesWithIcon = [
  {
    id: "men",
    label: "Men's Collection",
    icon: ShirtIcon,
    image: "https://i.pinimg.com/1200x/5c/15/3f/5c153fb20a09baa486ef8cf29b0476f4.jpg",
    description: "Discover premium men's fashion"
  },
  {
    id: "women",
    label: "Women's Collection",
    icon: CloudLightning,
    image: "https://i.pinimg.com/1200x/98/d7/fe/98d7fe06139caf52ceb703280337dd3b.jpg",
    description: "Explore elegant women's styles"
  },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: ShoppingBasket },

];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  console.log(productList, "productList");

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Carousel Section */}
      <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
            <div
              key={index}
              className={`${index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute inset-0 transition-all duration-1000 ease-in-out`}
            >
              <img
                src={slide?.image}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/10" />
            </div>
          ))
          : null}

        {/* Navigation Buttons */}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          className="absolute top-1/2 left-6 transform -translate-y-1/2 bg-white/90 hover:bg-white border-white/20 backdrop-blur-sm shadow-lg"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 right-6 transform -translate-y-1/2 bg-white/90 hover:bg-white border-white/20 backdrop-blur-sm shadow-lg"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </Button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {featureImageList.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                ? "bg-white shadow-lg scale-110"
                : "bg-white/50 hover:bg-white/70"
                }`}
            />
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Shop by <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Category</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our curated collections designed for every style and occasion
            </p>
          </div>

          <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-purple-500/50 to-pink-500/50 z-0"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {categoriesWithIcon.map((categoryItem, index) => (
              <div
                key={categoryItem.id}
                className={`relative group ${index === 0 ? 'lg:justify-self-end' : 'lg:justify-self-start'}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Card Container */}
                <div
                  onClick={() => handleNavigateToListingPage(categoryItem, "category")}
                  className="relative cursor-pointer transform transition-all duration-700 hover:scale-105"
                >
                  {/* Main Card */}
                  <div className="relative w-full max-w-lg mx-auto lg:mx-0 overflow-hidden rounded-3xl shadow-2xl group-hover:shadow-purple-500/25 transition-all duration-700">
                    {/* Image Container */}
                    <div className="relative h-80 lg:h-96 overflow-hidden">
                      <img
                        src={categoryItem.image}
                        alt={categoryItem.label}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-2"
                      />

                      {/* Gradient Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-purple-900/20 to-transparent"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-10">
                      {/* Icon Badge */}
                      <div className="absolute top-6 right-6 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                        <div className="p-4 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 group-hover:bg-white/25 transition-colors duration-300">
                          <categoryItem.icon className="w-8 h-8 text-white drop-shadow-lg" />
                        </div>
                      </div>

                      {/* Text Content */}
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-4xl lg:text-5xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors duration-300 leading-tight">
                          {categoryItem.label}
                        </h3>

                        <p className="text-white/80 text-lg lg:text-xl mb-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 leading-relaxed">
                          {categoryItem.description}
                        </p>

                        {/* CTA Button */}
                        <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">
                          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-purple-500/50 transition-all duration-300 group-hover:from-purple-400 group-hover:to-pink-400">
                            <span>Explore Now</span>
                            <ArrowRight className="w-6 h-6 ml-3 transform group-hover:translate-x-2 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>

                      {/* Decorative Border */}
                      <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-purple-500/50 to-pink-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mask-border"></div>
                    </div>
                  </div>

                  {/* Floating Number Badge */}
                  <div className={`absolute -top-4 ${index === 0 ? '-left-4' : '-right-4'} w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 z-10`}>
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl opacity-0 group-hover:opacity-75 transition-opacity duration-700 -z-10 scale-110"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Products</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked selections from our premium collection
            </p>
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {productList && productList.length > 0
              ? productList.map((productItem, index) => (
                <div
                  key={productItem.id}
                  className="transform hover:scale-105 transition-transform duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ShoppingProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                </div>
              ))
              : null}
          </div>

          {productList && productList.length === 0 && (
            <div className="text-center py-16">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                <ShoppingBasket className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">No Products Found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                We're currently updating our inventory. Please check back soon for amazing new products!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter/CTA Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Stay Updated with Latest Trends
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Get exclusive access to new arrivals, special offers, and fashion insights
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full border-0 focus:ring-4 focus:ring-white/20 text-gray-900 placeholder-gray-500 shadow-lg"
              />
              <Button className="px-8 py-3 bg-white text-indigo-600 hover:bg-gray-100 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;


