export const allCoachesSchema: string = `query{
  allCoachs{
    edges{
      node{
        seo_title
        seo_meta_description
        name
        profile_image
        welcome_message
        biography
        book_time_photo
        appearance_order
      }
    }
  }
}`;

export const allReviewsSchema: string = `query{
  allReviewss{
    edges{
      node{
        featured
        name
        quote
        _meta {
          firstPublicationDate
        }
      }
    }
  }
}`;

export const allReviewsPageSchema: string = `query {
  allReviews_pages {
    edges{
      node{
        seo_title
        seo_meta_description
        banner_image
        page_title
      }
    }
  }
}`;

export const homePageSchema: string = `query{
  allHome_pages {
    edges{
      node {
        seo_title
        seo_meta_description
        banner_line_one
        banner_line_two
        banner_background_image
        featured_image
        featured_mesage_body
        featured_message_header
        block_widgets {
          widget_description
          widget_image
          widget_title
        }          
      }
    }
  }
}`;

export const servicesPageSchema: string = `query{
  allServices_pages{
    edges{
      node{
        seo_title
        seo_meta_description
        banner_image
        page_content{
          section_title
          section_content
        }
      }
    }
  }
}`;

export const ourStorySchema: string = `query{
  allOur_storys{
    edges{
      node {
        seo_title
        seo_meta_description
        banner_image
        title
        page_content
      }
    }
  }
}`;

export const podcastPageSchema: string = `query {
  allPodcast_pages{
    edges{
      node{
        seo_meta_description
        seo_title
        banner_image
      }
    }
  }
}`;


export const allBlogsSchema: string = `query {
  allBlog_posts {
    edges {
      node {        
        post_title
        sub_title
        slug_text
        publish_date
        author {
          ...on Coach {
            name
            
          }
        }
            
      }
    }
  }
}`
