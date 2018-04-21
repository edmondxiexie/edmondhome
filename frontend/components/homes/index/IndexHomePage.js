import React from "react";

import GalleryCard from "../../common/GalleryCard";
import Pagination from "../../common/Pagination";
import Loader from "../../common/Loader";

class IndexHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: localStorage.indexHomePage || 1,
      pages: 1,
      homes: [],
      homesCount: 0,
      searchStr: this.props.searchStr,
      isLoading: true
    };
  }

  componentWillMount() {
    this.props.fetchHomesCount();
    this.props.fetchHomesPage(this.state.page).then(() => {
      if (this.props.auth.isAuthenticated) {
        this.props.fetchWishlist(this.props.auth.user.id);
      }
    });
  }

  componentDidMount() {
    setTimeout(() => this.setState({ isLoading: false }), 1000); // simulates an async action, and hides the spinner
  }

  componentWillReceiveProps(nextProps) {
    let pages = Math.ceil(nextProps.homesCount / 12);
    const { homes, page, searchStr } = nextProps;
    this.setState({
      homes: homes,
      page: page,
      pages: pages,
      searchStr: searchStr
    });
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
      if (Number(page) !== 0) {
        if (Number(page) >= this.state.pages) {
          page = this.state.pages;
        }
        this.setState({
          page: ~~page
        });
      } else {
        this.setState({
          page: ""
        });
      }
    }
  }

  onChangePagePress(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      let page = e.target.value;
      this.fetchNewPage(page);
      localStorage.setItem("indexHomePage", page);
      window.scrollTo(0, 0);
    }
  }

  onNextPage(e) {
    e.preventDefault();
    const currentPage = ~~this.state.page;
    let newPage = currentPage + 1;
    if (~~newPage > this.state.pages) {
      newPage = this.state.pages;
    }
    this.setState({ page: newPage });
    this.fetchNewPage(newPage);
    localStorage.setItem("indexHomePage", newPage);
    window.scrollTo(0, 0);
  }

  onPreviousPage(e) {
    e.preventDefault();
    const currentPage = ~~this.state.page;
    const newPage = currentPage - 1;
    this.setState({ page: newPage });
    this.fetchNewPage(newPage);
    localStorage.setItem("indexHomePage", newPage);
    window.scrollTo(0, 0);
  }

  onFirstPage(e) {
    e.preventDefault();
    this.setState({ page: 1 });
    this.fetchNewPage(1);
    localStorage.setItem("indexHomePage", 1);
    window.scrollTo(0, 0);
  }

  onLastPage(e) {
    e.preventDefault();
    const pages = this.state.pages;
    this.setState({ page: pages });
    this.fetchNewPage(pages);
    localStorage.setItem("indexHomePage", pages);
    window.scrollTo(0, 0);
  }

  addToWishlist(e, home_id) {
    e.stopPropagation();
    const wishData = {
      home_id: home_id,
      keeper_id: this.props.auth.user.id
    };
    this.props.addWishlist(wishData).then(res => {
      this.props.fetchWishlist(this.props.auth.user.id);
      this.props.fetchWishlistCount(this.props.auth.user.id);
    });
  }

  deleteFromWishlist(e, id) {
    e.stopPropagation();
    this.props.deleteWishlist(id).then(res => {
      this.props.fetchWishlist(this.props.auth.user.id);
      this.props.fetchWishlistCount(this.props.auth.user.id);
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
            showFavButton={this.props.auth.isAuthenticated}
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
    const alert = {
      text: "Test Alert",
      type: "success"
    };
    this.props.addAlert(alert);
  }

  buildIndexHomesPage() {
    const { homes, page, pages } = this.state;
    const wishlist = this.props.wishlist || [];
    if (this.state.searchStr === "") {
      return (
        <div className="container">
          <h1 className="page-title">Homes around the world</h1>
          <Pagination
            page={page}
            pages={pages}
            onChangePage={e => {
              this.onChangePage(e);
            }}
            onKeyDown={e => {
              this.onChangePagePress(e);
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
          <div className="container row">
            {this.buildGallery(homes, wishlist)}
          </div>
          <Pagination
            page={page}
            pages={pages}
            onChangePage={e => {
              this.onChangePage(e);
            }}
            onKeyDown={e => {
              this.onChangePagePress(e);
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
    } else {
      if (homes.length) {
        return (
          <div className="container">
            <h1 className="page-title">{`Here is the search result for '${
              this.state.searchStr
            }'`}</h1>
            <div className="container row">
              {this.buildGallery(homes, wishlist)}
            </div>
          </div>
        );
      } else {
        return (
          <div className="container">
            <div className="jumbotron no-result">
              <h1 className="page-title">
                {`Sorry we don't find the search result for '${
                  this.state.searchStr
                }'`}
              </h1>
            </div>
          </div>
        );
      }
    }
  }

  render() {
    if (this.state.isLoading) {
      return <Loader />;
    }
    return this.buildIndexHomesPage();
  }
}

IndexHomePage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default IndexHomePage;
