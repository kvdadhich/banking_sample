$(document).ready(function(){
  
      var $targ = $('#jcrop3');
      var ratio = $targ.attr("data-ratio");
      console.log("ratio",ratio)
      if (ratio == null){
        $targ.Jcrop({
          animEasing: 'linear',
          bgOpacity: 0.75,
          linked: false,
          multi: false,
          minSize: [185,132],
          
          onChange: update_crop,
          onSelect: update_crop,
          setSelect: [ 200, 50, 100, 200 ],
          aspectRatio: 428/600
        },function(){
          this.container.addClass('jcrop-dark jcrop-hl-active');
          interfaceLoad(this);
        });
      }else{
        $targ.Jcrop({
          animEasing: 'linear',
          bgOpacity: 0.75,
          linked: false,
          multi: false,
          minSize: [150,150],
          
          onChange: update_crop,
          onSelect: update_crop,
          setSelect: [ 200, 50, 100, 200 ],
          aspectRatio: 100/100
        },function(){
          this.container.addClass('jcrop-dark jcrop-hl-active');
          interfaceLoad(this);
        });
      }

      function interfaceLoad(obj){
        var cb = obj;

        // cb.newSelection();
        // // cb.setSelect([ 200, 50, 100, 200  ]);
        // cb.refresh();
        // // Hack a "special" selection...
        // // var logosel = cb.newSelection().update($.Jcrop.wrapFromXywh([200, 50, 100, 200 ]));

        // $.extend(logosel,{
        //   special: true, // custom value used in our local script here
        //   bgColor: '#999',
        //   bgOpacity: 0.8,
        //   canResize: true,
        //   canDelete: false
        // });

        // // logosel.element.prepend('<img src="images/favicons/android-chrome-192x192.png" style="position:absolute;background-color:white;width:100%;height:100%;" />');
        // logosel.aspectRatio = 1;
        // logosel.refresh();
        // cb.ui.multi[1].focus();

        $('#filter-selections input').attr('checked',false);
        $('#page-interface').on('startselect',function(e){
          e.preventDefault();
        });

        /**
         *
         */
         cb.container.on('cropfocus cropblur cropstart cropend',function(e){
          var sel = $(e.target).data('selection');
          switch(e.type){
            case 'cropfocus':
            sel.canResize = true;
            // $('#can_delete')[0].checked = sel.canDelete?true:false;
            sel.canDrag= true;
            // $('#can_drag')[0].checked = sel.canDrag?true:true;
            (sel.minSize[0]>8)?true:false;
            // $('#set_minsize')[0].checked = (sel.minSize[0]>8)?true:false;
            // $('#set_maxsize')[0].checked = (sel.maxSize[0])?true:false;
            // $('#set_bounds')[0].checked = (sel.edge.n)?true:false;
            // $('#is_linked')[0].disabled = sel.special?true:false;
            // $('#is_linked')[0].checked = sel.linked?true:false;
            // $('#shading-tools a')[0].disabled = sel.special?true:false;
            // $('#shading-tools a')[sel.special?'addClass':'removeClass']('disabled');

            $('#ar-links').find('.active').removeClass('active');
            if (sel.aspectRatio) {
              if (!$('#ar-links').find('[data-value="'+sel.aspectRatio+'"]').addClass('active').length){
                $('#ar-lock').addClass('active');
              }
            } else {
              $('#ar-free').addClass('active');
            }
          }
        });

  $('#is_linked').on('change',function(e){
    cb.ui.selection.linked = e.target.checked;
  });

  $('#selection-options').on('change','[data-filter-toggle]',function(e){
    var tog = $(e.target).data('filter-toggle');
    var o = { };
    o[tog] = e.target.checked? true: false;
    cb.setOptions(o);
  });

  var cycleColors = [
  'red',
  'blue',
  'gray',
  'yellow',
  'orange',
  'green',
  'white'
  ];

  function randomCoords() {
    return [
    Math.random()*300,
    Math.random()*200,
    (Math.random()*540)+50,
    (Math.random()*340)+60
    ];
  }

  $('#can_drag,#can_size,#can_delete,#enablesel,#multisel,#anim_mode').attr('checked','checked');
  $('#is_linked').attr('checked',false);

  function animMode(){
    return document.getElementById('anim_mode').checked;
  }

        // A simple function to cleanup multiple spawned selections
        function runCleanup(){
          var m = cb.ui.multi, s = cb.ui.selection;

          for(var i=0;i<m.length;i++){
            if (s !== m[i]){
              m[i].remove();
            }
          }

          cb.ui.multi = [ s ];
          s.center();
          s.focus();
        }

        // Animate button event
        $(document.body).on('click','[data-action]',function(e){
          var $targ = $(e.target);
          var action = $targ.data('action');

          switch(action){
            // case 'set-maxsize':
            // cb.setOptions({ maxSize: e.target.checked? [300,200]: [0,0] });
            // break;
            // case 'set-minsize':
            // cb.setOptions({ minSize: [185,132] });
            // break;
            // case 'set-bounds':
            // if (e.target.checked){
            //   cb.setOptions({ edge: {
            //     n: 15,
            //     e: -20,
            //     s: -40,
            //     w: 28
            //   }});
            // }
            // else {
            //   cb.setOptions({ edge: {
            //     n: 0,
            //     e: 0,
            //     s: 0,
            //     w: 0
            //   }});
            // }
            // break;
            case 'set-ar':
            var value = $targ.data('value');
            $targ.closest('#ar-links').find('.active').removeClass('active');
            if (value === 'lock'){
              var b = cb.ui.selection.get();
              value = b.w / b.h;
            }
            $targ.addClass('active');
            cb.setOptions({ aspectRatio: value });
            break;
            case 'set-selmode':
            $targ.closest('.btn-group').find('.active').removeClass('active');
            $targ.addClass('active');
            switch($targ.data('mode')){
              case 'none':
              cb.container.addClass('jcrop-nodrag');
              cb.setOptions({ allowSelect: false });
              break;
              case 'single':
              cb.container.removeClass('jcrop-nodrag');
              cb.setOptions({ allowSelect: true, multi: false });
              break;
              // case 'multi':
              // cb.container.removeClass('jcrop-nodrag');
              // cb.setOptions({ allowSelect: true, multi: true });
              // break;
            }
            break;
            case 'enable-selections':
            cb.ui.stage.dragger.active = e.target.checked;
            break;
            case 'enable-multi':
            cb.ui.stage.dragger.multi = e.target.checked;
            break;
            case 'color-cycle':
            var cc = cycleColors.shift();
            cb.setOptions({ bgColor: cc });
            cycleColors.push(cc);
            break;
            case 'set-opacity':
            $targ.closest('.btn-group').find('.active').removeClass('active');
            $targ.addClass('active');
            cb.setOptions({ bgOpacity: 0.75, bgColor: 'black' });
            break;
            case 'cleanup-all':
            runCleanup();
            break;
            case 'random-move':
            cb[animMode()?'animateTo':'setSelect'](randomCoords());
            break;
          }

        }).on('keydown',function(e){
          if (e.keyCode === 8) {
            e.preventDefault();
          }
        }).on('selectstart',function(e){
          e.preventDefault();
        }).on('click','a[data-action]',function(e){
          e.preventDefault();
        });
      }


})
// $(function() {
//   $('#jcrop3').Jcrop({
//     onChange: update_crop,
//     onSelect: update_crop,
//     // setSelect: [ 200, 50, 100, 200 ],
//     // aspectRatio: 185/132
//   });
// });

function update_crop(coords) {
  var rx = 100/coords.w;
  var ry = 100/coords.h;
  $('#preview').css({
    width: Math.round(rx * $('#jcrop3').attr('data-lwidth')) + 'px',
    height: Math.round(ry * $('#jcrop3').attr('data-lheight')) + 'px',
    marginLeft: '-' + Math.round(rx * coords.x) + 'px',
    marginTop: '-' + Math.round(ry * coords.y) + 'px'
  });
  var ratio = $('#jcrop3').attr('data-owidth') / $('#jcrop3').attr('data-lwidth');
  $("#crop_x").val(Math.round(coords.x * ratio));
  $("#crop_y").val(Math.round(coords.y * ratio));
  $("#crop_w").val(Math.round(coords.w * ratio));
  $("#crop_h").val(Math.round(coords.h * ratio));
}