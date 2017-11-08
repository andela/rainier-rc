import React, { Component, PropTypes } from "react";
import {
  Button,
  Currency,
  DropDownMenu,
  MenuItem,
  Translation,
  Toolbar,
  ToolbarGroup
} from "/imports/plugins/core/ui/client/components/";
import {
  AddToCartButton,
  ProductMetadata,
  ProductTags,
  ProductField
} from "./";
import { AlertContainer } from "/imports/plugins/core/ui/client/containers";
import { PublishContainer } from "/imports/plugins/core/revisions";
import firebase from "firebase";
import config from "../firebase/config";

firebase.initializeApp(config);

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProductOption: "",
      downloadUrl: "",
      isDigital: false,
      uploadProgress: 0
    };

    this.getSelectedOption = this.getSelectedOption.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
  }
  componentDidMount() {
    // check if product is digital or physical and render accordingly
    if (this.props.product.isDigital) {
      this.setState({
        selectedProductOption: "digital"
      });
    }
  }
  get tags() {
    return this.props.tags || [];
  }

  get product() {
    return this.props.product || {};
  }

  get editable() {
    return this.props.editable;
  }

  handleVisibilityChange = (event, isProductVisible) => {
    if (this.props.onProductFieldChange) {
      this.props.onProductFieldChange(this.product._id, "isVisible", isProductVisible);
    }
  }

  handlePublishActions = (event, action) => {
    if (action === "archive" && this.props.onDeleteProduct) {
      this.props.onDeleteProduct(this.product._id);
    }
  }

  renderToolbar() {
    if (this.props.hasAdminPermission) {
      return (
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <Translation defaultValue="Product Management" i18nKey="productDetail.productManagement"/>
          </ToolbarGroup>
          <ToolbarGroup>
            <DropDownMenu
              buttonElement={<Button label="Switch" />}
              onChange={this.props.onViewContextChange}
              value={this.props.viewAs}
            >
              <MenuItem label="Administrator" value="administrator" />
              <MenuItem label="Customer" value="customer" />
            </DropDownMenu>
          </ToolbarGroup>
          <ToolbarGroup lastChild={true}>
            <PublishContainer
              documentIds={[this.product._id]}
              documents={[this.product]}
              onVisibilityChange={this.handleVisibilityChange}
              onAction={this.handlePublishActions}
            />
          </ToolbarGroup>
        </Toolbar>
      );
    }

    return null;
  }

  getSelectedOption(event) {
    this.setState({
      selectedProductOption: event.target.value
    });
  }


  selectProductOptions() {
    if (this.props.hasAdminPermission) {
      return (
        <div className="switch-middle">
          <select className="form-control select-category" name="category" onChange={this.getSelectedOption} value={this.state.selectedProductOption}>
            <option className="physical-category" value="physical">Physical Product</option>
            <option className="digital-category" value="digital">Digital Product</option>
          </select>
        </div>
      );
    }
    return null;
  }
  // uploads the digital product file
  uploadHandler() {
    const file = document.getElementById("uploadFile").files[0];

    if (!file) {
      Alerts.toast("Select a file to be uploaded", "error");
      return;
    }

    const fileName = file.name;
    const storageRef = firebase.storage().ref("digitalProducts");
    const spaceRef = storageRef.child(fileName);
    const uploadTask = spaceRef.put(file);

    Alerts.toast("Uploading File...", "success");

    uploadTask.on("state_changed", (snapshot) => {
      const progressLevel = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.setState({ uploadProgress: progressLevel });
    }, () => {
      Alerts.toast("Error in uploading file", "error");
    }, () => {
      const downloadURL = uploadTask.snapshot.downloadURL;
      Alerts.toast("File Uploading Completed", "success");
      this.setState({
        downloadUrl: downloadURL,
        isDigital: true
      });
      this.props.onProductFieldChange(this.product._id, "downloadUrl", this.state.downloadUrl);
      this.props.onProductFieldChange(this.product._id, "isDigital", true);
      document.getElementById("uploadFile").value = "";
    });
  }

  digitalDetails() {
    if (this.props.hasAdminPermission && this.state.selectedProductOption === "digital") {
      return (
        <div>
          <input className="btn btn-success fileInput" type="file" id="uploadFile" />
          <button className="btn btn-success no-round uploadButton" id="upload-btn" onClick={this.uploadHandler}>Upload Product</button>
        </div>
      );
    }
    return null;
  }

  showUploadProgress() {
    if (this.state.uploadProgress > 0 && this.state.uploadProgress < 100) {
      return (
        <button className="btn btn-success upload-progress">
          {(Math.floor(this.state.uploadProgress)) + "%"}
        </button>
      );
    }
    return null;
  }

  render() {
    return (
      <div className="" style={{position: "relative"}}>
        {this.renderToolbar()}

        <div className="container-main container-fluid pdp-container" itemScope itemType="http://schema.org/Product">
          <AlertContainer placement="productManagement" />

          <header className="pdp header">
            <ProductField
              editable={this.editable}
              fieldName="title"
              fieldTitle="Title"
              element={<h1 />}
              onProductFieldChange={this.props.onProductFieldChange}
              product={this.product}
              textFieldProps={{
                i18nKeyPlaceholder: "productDetailEdit.title",
                placeholder: "Title"
              }}
            />

            <ProductField
              editable={this.editable}
              fieldName="pageTitle"
              fieldTitle="Sub Title"
              element={<h2 />}
              onProductFieldChange={this.props.onProductFieldChange}
              product={this.product}
              textFieldProps={{
                i18nKeyPlaceholder: "productDetailEdit.pageTitle",
                placeholder: "Subtitle"
              }}
            />
          </header>


          <div className="pdp-content">
            <div className="pdp column left pdp-left-column">
              {this.props.mediaGalleryComponent}
              <ProductTags editable={this.props.editable} product={this.product} tags={this.tags} />
              <ProductMetadata editable={this.props.editable} product={this.product} />
            </div>

            <div className="pdp column right pdp-right-column">


              <div className="pricing">
                <div className="left">
                  <span className="price">
                    <span id="price">
                      <Currency amount={this.props.priceRange} />
                    </span>
                  </span>
                </div>
                <div className="right">
                  {this.props.socialComponent}
                </div>
              </div>


              <div className="vendor">
                <ProductField
                  editable={this.editable}
                  fieldName="vendor"
                  fieldTitle="Vendor"
                  onProductFieldChange={this.props.onProductFieldChange}
                  product={this.product}
                  textFieldProps={{
                    i18nKeyPlaceholder: "productDetailEdit.vendor",
                    placeholder: "Vendor"
                  }}
                />
              </div>

              <div className="pdp product-info">
                <ProductField
                  editable={this.editable}
                  fieldName="description"
                  fieldTitle="Description"
                  multiline={true}
                  onProductFieldChange={this.props.onProductFieldChange}
                  product={this.product}
                  textFieldProps={{
                    i18nKeyPlaceholder: "productDetailEdit.description",
                    placeholder: "Description"
                  }}
                />
                {this.selectProductOptions()}
                <div className="row">
                    <div className="col-xs-10">
                      {this.digitalDetails()}
                    </div>
                    <div className="col-xs-2">
                      {this.showUploadProgress()}
                    </div>
                </div>
              </div>

              <div className="options-add-to-cart">
                {this.props.topVariantComponent}
              </div>
              <hr />
              <div>
                <AlertContainer placement="productDetail" />
                <AddToCartButton
                  cartQuantity={this.props.cartQuantity}
                  onCartQuantityChange={this.props.onCartQuantityChange}
                  onClick={this.props.onAddToCart}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProductDetail.propTypes = {
  cartQuantity: PropTypes.number,
  editable: PropTypes.bool,
  hasAdminPermission: PropTypes.bool,
  mediaGalleryComponent: PropTypes.node,
  onAddToCart: PropTypes.func,
  onCartQuantityChange: PropTypes.func,
  onDeleteProduct: PropTypes.func,
  onProductFieldChange: PropTypes.func,
  onViewContextChange: PropTypes.func,
  priceRange: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  product: PropTypes.object,
  socialComponent: PropTypes.node,
  tags: PropTypes.arrayOf(PropTypes.object),
  topVariantComponent: PropTypes.node,
  viewAs: PropTypes.string
};

export default ProductDetail;
