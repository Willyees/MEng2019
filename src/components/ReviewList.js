import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';


function redirectAddReview(e){
  if(e.currentTarget.value != ""){
    // window.location.href = `/review?username=${e.currentTarget.value}`;
    window.location.href = `/review?meal=${e.currentTarget.value}`;
  }
  else
    console.log("user being reviewed is empty. error in add review button");
}

class ReviewList extends Component{//have to pass reviews from the parent
    constructor(props){
      super(props);
    }
    render(){
        return(
        <div>
            <Grid item container xs={12}>
            {/* review title grid */}
            <Grid id="review_title_grid" item container xs={10} style={{justifyContent:"left", marginBottom:'3%'}}>
              <Typography id="review_title" variant="h2" component="h2" gutterBottom>
                {this.props.title}
              </Typography>
            </Grid>
            {/* addItem button */}
            {!this.props.reviewDisabled && 
            <Grid item container xs={2} style={{"justify-content":"flex-end"}}>

            <Button
                size="big"
                startIcon={< AddCircleOutlineIcon/>}
                type="submit"
                style={{contentFit:"contain", maxHeight:"50%", bottom:0}}
                value={this.props.mealId}
                onClick={redirectAddReview}>
                Add review
            </Button>
            </Grid>}
            
            </Grid>
            {this.props.reviews.map((v,k) => (<Review data={v} />))}
        </div>
        );
    }
}
export default ReviewList;

function Review(props){
    return(
        <Grid id="review_list_grid" item container xs={12} style={{padding: 5}}>   
              <Card variant="outlined" height="100%" style={{"width" : "100%"}}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" id="reviewer">
                      {props.data.username.charAt(0)}
                    </Avatar>
                  }
                  title={props.data.title}
                  subheader={props.data.date} style={{textAlign:"left"}}

                  action={
                    <Rating
                      name="read-only"
                      value={props.data.star_rating}
                      precision={1}
                      readOnly
                    />
                  }
                />
                <CardContent >
                  <Typography variant="body2" component="p">
                    {props.data.body}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

    )
}