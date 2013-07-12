/* DOKUWIKI:include_once jquery.prettyPhoto.js */

/**
 * Add a quicklink to the media popup
 */
function gallery_plugin(){
    var $opts = jQuery('#media__opts');
    if(!$opts.length) return;
    if(!window.opener) return;

    var glbl = document.createElement('label');
    var glnk = document.createElement('a');
    var gbrk = document.createElement('br');
    glnk.name         = 'gallery_plugin';
    glnk.innerHTML    = LANG.plugins.gallery.addgal; //FIXME localize
    glnk.style.cursor = 'pointer';

    glnk.onclick = function(){
        var $h1 = jQuery('#media__ns');
        if(!$h1.length) return;
        var ns = $h1[0].innerHTML;
        opener.insertAtCarret('wiki__text','{{gallery>'+ns+'}}');
        if(!dw_mediamanager.keepopen) window.close();
    };

    $opts[0].appendChild(glbl);
    glbl.appendChild(glnk);
    $opts[0].appendChild(gbrk);
}

/**
 * Display a selected page and hide all others
 */
function gallery_pageselect(e){
    var galid = e.target.hash.substr(10,4);
    var $pages = jQuery('div.gallery__'+galid);
    $pages.hide();
    jQuery('#'+e.target.hash.substr(1)).show();
    return false;
}

// === main ===
jQuery(function(){
    if(aGalleryData.big_box_div_class)
    {
      jQuery("a.lightbox, a[rel^='lightbox']").click(function(evt){
          var sImagePath = jQuery(evt.currentTarget).attr('href');
          jQuery('<img />')
              .attr('src', sImagePath)
              .load(function(){              
                  jQuery('.'+aGalleryData.big_box_div_class).fadeOut(function(){
                   jQuery(this).html('<img src="'+sImagePath+'" />').fadeIn()   
                      ;
                  });
          
              });
            
              
      
          return false;
      });
      var $eFirst = jQuery("a.lightbox, a[rel^='lightbox']").first();
        $eFirst.click(); 
      
    }
    else
    {
      var aGallery = {
          overlay_gallery: false,
          show_title: aGalleryData.lightbox_title,
          slideshow: aGalleryData.slideshow_duration,
          autoplay_slideshow: aGalleryData.autoslideshow,
          theme: aGalleryData.slideshow_theme,
          description_src: 'longdesc'
      };
        
      jQuery("a.lightbox, a[rel^='lightbox']").prettyPhoto(aGallery);
      
      if(aGalleryData.autolightbox === true)
      {
        var $eFirst = jQuery("a.lightbox, a[rel^='lightbox']").first();
        $eFirst.click();  
      }
      
      gallery_plugin();
  
      // hide all pages except the first one
      var $pages = jQuery('div.gallery_page');
      $pages.hide();
      $pages.eq(0).show();
  
      // attach page selector
      jQuery('a.gallery_pgsel').click(gallery_pageselect);
    }
  });

