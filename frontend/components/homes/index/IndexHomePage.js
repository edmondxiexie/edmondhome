import React from "react";
import GalleryCard from "../../common/GalleryCard";
import Pagination from "../../common/Pagination";

class IndexHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      pages: 1,
      homes: [],
      homesCount: 0
    };
  }

  componentWillMount() {
    this.props.fetchHomesCount().then(() => {
      let pages = Math.ceil(this.props.homesCount / 12);
      this.setState({ pages: pages });
    });
    this.props.fetchHomesPage(this.state.page).then(() => {
      this.setState({ homes: this.props.homes });
      if (this.props.auth.isAuthenticated) {
        this.props.fetchWishlist(this.props.auth.user.id);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const newHomes = nextProps.homes || [];
    this.setState({ homes: newHomes });
  }

  onRedirect(e, id) {
    e.preventDefault();
    this.context.router.push(`/homes/${id}`);
  }

  fetchNewPage(newPage) {
    this.props.fetchHomesPage(newPage);
  }

  onChangePage(e) {
    e.preventDefault();
    let page = e.target.value;
    if (!isNaN(page)) {
      if (page > 0 && page <= this.state.pages) {
        page = parseInt(page);
        this.setState({ page: page });
        this.fetchNewPage(e.target.value);
      }
    }
  }

  onNextPage(e) {
    e.preventDefault();
    const newPage = this.state.page + 1;
    this.setState({ page: newPage });
    this.fetchNewPage(newPage);
  }

  onPreviousPage(e) {
    e.preventDefault();
    const newPage = this.state.page - 1;
    this.setState({ page: newPage });
    this.fetchNewPage(newPage);
  }

  onFirstPage(e) {
    e.preventDefault();
    this.setState({ page: 1 });
    this.fetchNewPage(1);
  }

  onLastPage(e) {
    e.preventDefault();
    this.setState({ page: this.state.pages });
    this.fetchNewPage(this.state.pages);
  }

  addToWishlist(e, home_id) {
    e.stopPropagation();
    const wishData = {
      home_id: home_id,
      keeper_id: this.props.auth.user.id
    };
    this.props.addWishlist(wishData).then(res => {
      this.props.fetchWishlist(this.props.auth.user.id);
    });
  }

  deleteFromWishlist(e, id) {
    e.stopPropagation();
    this.props.deleteWishlist(id).then(res => {
      this.props.fetchWishlist(this.props.auth.user.id);
    });
  }

  buildGallery(homes, wishlist) {
    let gallery = [];
    for (let home of homes) {
      let {
        id,
        title,
        description,
        image,
        property_type,
        room_type,
        price,
        district
      } = home;

      let onWishlist = false;
      let wishId = null;

      for (let wish of wishlist) {
        if (id === wish.home_id) {
          onWishlist = true;
          wishId = wish.id;
          break;
        }
      }
      gallery.push(
        <div key={id} className="col-md-4 col-sm-6">
          <GalleryCard
            propertyType={property_type}
            roomType={room_type}
            price={price}
            district={district}
            id={id}
            title={title}
            description={description}
            image={image}
            showWishlist={true}
            onWishlist={onWishlist}
            handleClick={(e, id) => {
              this.onRedirect(e, id);
            }}
            addToWishlist={e => this.addToWishlist(e, id)}
            deleteFromWishlist={e => this.deleteFromWishlist(e, wishId)}
          />
        </div>
      );
    }
    return gallery;
  }

  textAlert(e) {
    e.preventDefault();
    this.props.setAlert("TEST ALERT");
    setTimeout(() => {
      this.props.setAlert("");
    }, 3000);
  }

  render() {
    let homes = this.state.homes;
    const wishlist = this.props.wishlist || [];

    return (
      <div>
        <div className="container row">
          <h1 className="text-center">Index page</h1>
          <button
            className="btn btn-primary"
            onClick={e => {
              this.textAlert(e);
            }}
          >
            Alert
          </button>
          <Pagination
            page={this.state.page}
            pages={this.state.pages}
            onChangePage={e => {
              this.onChangePage(e);
            }}
            onNextPage={e => {
              this.onNextPage(e);
            }}
            onPreviousPage={e => {
              this.onPreviousPage(e);
            }}
            onFirstPage={e => {
              this.onFirstPage(e);
            }}
            onLastPage={e => {
              this.onLastPage(e);
            }}
          />
          {this.buildGallery(homes, wishlist)}
        </div>

        <Pagination
          page={this.state.page}
          pages={this.state.pages}
          onChangePage={e => {
            this.onChangePage(e);
          }}
          onNextPage={e => {
            this.onNextPage(e);
          }}
          onPreviousPage={e => {
            this.onPreviousPage(e);
          }}
          onFirstPage={e => {
            this.onFirstPage(e);
          }}
          onLastPage={e => {
            this.onLastPage(e);
          }}
        />
      </div>
    );
  }
}

IndexHomePage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default IndexHomePage;
