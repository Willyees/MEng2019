import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import InfoIcon from '@material-ui/icons/Info';

import image1 from '../res/burger.jfif';
import image2 from '../res/spaghetti.jfif';
import image3 from '../res/group_meal.webp';
import { datePickerDefaultProps } from '@material-ui/pickers/constants/prop-types';

// import recentMeals from '../views/alessiosmealpage';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon:{
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

// function sortRecentMeals(){
//   recentMeals.sort((a,b) => a.date > b.date );
// }

export default function SingleLineGridList(props) {
  const classes = useStyles();
  
  //sortRecentMeals;

  // if(recentMeals.size >=3){
  //   const tileData = [
  //     {
  //       /* 
  //         img: {recentMeals["meal[0].image"]},
  //         title: {recentMeals["meal[0].title"]},
  //         author: {recentMeals["meal[0].author"]},
  //       */
  //     },

  //     {
  //       /* 
  //         img: {recentMeals["meal[1].image"]},
  //         title: {recentMeals["meal[1].title"]},
  //         author: {recentMeals["meal[1].author"]},
  //       */
  //     },

  //     {
  //       /* 
  //         img: {recentMeals["meal[2].image"]},
  //         title: {recentMeals["meal[2].title"]},
  //         author: {recentMeals["meal[2].author"]},
  //       */
  //     },
  //   ];
  // } else{
  //   //keep the default
  //   const tileData = [
  //     {
  //         img: image1,
  //         title: 'meal1',
  //         author: 'unknown',
          
  //     },
  //     {
  //        img: image2,
  //        title: 'meal2',
  //        author: 'unknown',
  //    },
  //    {
  //        img: image3,
  //        title: 'meal3',
  //        author: 'unknown',
  //    },
  //   ];
  // }

  //this should be replaced by the above once new meals page is introduced
  const tileData = [
    {
        img: image1,
        title: 'meal1',
        author: 'unknown',
        
    },
    {
       img: image2,
       title: 'meal2',
       author: 'unknown',
   },
   {
       img: image3,
       title: 'meal3',
       author: 'unknown',
   },
  ];


  return (//images hardcoded because we dont ahve them yet. todo: add images names to db
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {props.recentMeals.map(tile => (
          <GridListTile key={tile.id} cols={2} >
            <img src={image2} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>by: {tile.host}</span>}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton aria-label={`info about ${tile.title}`} className={classes.icon} href={`show-meal?meal=${tile.id}`}>
                  <InfoIcon />
                </IconButton>
              }
            />
            
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}