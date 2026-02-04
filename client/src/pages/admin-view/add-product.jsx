import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { addProductFormElements } from "@/config";
import { addNewProduct } from "@/store/admin/products-slice";
import { addFeatureImage, getFeatureImages, deleteFeatureImage } from "@/store/common-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const initialFormData = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
    averageReview: 0,
};

function AdminAddProduct() {
    const [formData, setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const [featureImageFile, setFeatureImageFile] = useState(null);
    const [uploadedFeatureImageUrl, setUploadedFeatureImageUrl] = useState("");
    const [featureImageLoadingState, setFeatureImageLoadingState] = useState(false);

    const dispatch = useDispatch();
    const { toast } = useToast();
    const { featureImageList } = useSelector((state) => state.commonFeature);

    function onSubmit(event) {
        event.preventDefault();

        dispatch(
            addNewProduct({
                ...formData,
                image: uploadedImageUrl,
            })
        ).then((data) => {
            if (data?.payload?.success) {
                setImageFile(null);
                setFormData(initialFormData);
                setUploadedImageUrl("");
                toast({
                    title: "Product add successfully",
                });
            }
        });
    }

    function handleUploadFeatureImage() {
        dispatch(addFeatureImage(uploadedFeatureImageUrl)).then((data) => {
            if (data?.payload?.success) {
                dispatch(getFeatureImages());
                setFeatureImageFile(null);
                setUploadedFeatureImageUrl("");
            }
        });
    }

    useEffect(() => {
        dispatch(getFeatureImages());
    }, [dispatch]);

    function isFormValid() {
        return Object.keys(formData)
            .filter((currentKey) => currentKey !== "averageReview")
            .map((key) => formData[key] !== "")
            .every((item) => item);
    }

    useEffect(() => {
        if (uploadedImageUrl) {
            setFormData({
                ...formData,
                image: uploadedImageUrl
            })
        }
    }, [uploadedImageUrl]);

    return (
        <Fragment>
            <div className="flex flex-col gap-6">
                <h1 className="text-3xl font-bold">Add Product / Features</h1>
                <Tabs defaultValue="product" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="product">Add New Product</TabsTrigger>
                        <TabsTrigger value="features">Feature Images</TabsTrigger>
                    </TabsList>

                    <TabsContent value="product">
                        <Card>
                            <CardHeader>
                                <CardTitle>Product Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <ProductImageUpload
                                    imageFile={imageFile}
                                    setImageFile={setImageFile}
                                    uploadedImageUrl={uploadedImageUrl}
                                    setUploadedImageUrl={setUploadedImageUrl}
                                    setImageLoadingState={setImageLoadingState}
                                    imageLoadingState={imageLoadingState}
                                    isEditMode={false}
                                />
                                <CommonForm
                                    onSubmit={onSubmit}
                                    formData={formData}
                                    setFormData={setFormData}
                                    buttonText="Add Product"
                                    formControls={addProductFormElements}
                                    isBtnDisabled={!isFormValid() || imageLoadingState}
                                />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="features">
                        <Card>
                            <CardHeader>
                                <CardTitle>Feature / Slider Images</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <ProductImageUpload
                                    imageFile={featureImageFile}
                                    setImageFile={setFeatureImageFile}
                                    uploadedImageUrl={uploadedFeatureImageUrl}
                                    setUploadedImageUrl={setUploadedFeatureImageUrl}
                                    setImageLoadingState={setFeatureImageLoadingState}
                                    imageLoadingState={featureImageLoadingState}
                                    isCustomStyling={true}
                                />
                                <Button
                                    onClick={handleUploadFeatureImage}
                                    disabled={!uploadedFeatureImageUrl || featureImageLoadingState}
                                    className="w-full"
                                >
                                    Upload Feature Image
                                </Button>
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {featureImageList && featureImageList.length > 0
                                        ? featureImageList.map((featureImgItem) => (
                                            <div className="relative group" key={featureImgItem._id}>
                                                <img
                                                    src={featureImgItem.image}
                                                    className="w-full h-[300px] object-cover rounded-lg"
                                                />
                                                <Button
                                                    onClick={() => {
                                                        dispatch(deleteFeatureImage(featureImgItem._id)).then((data) => {
                                                            if (data?.payload?.success) {
                                                                dispatch(getFeatureImages());
                                                            }
                                                        });
                                                    }}
                                                    variant="destructive"
                                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        ))
                                        : null}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </Fragment>
    );
}

export default AdminAddProduct;
