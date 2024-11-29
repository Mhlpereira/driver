function solution(N, ratings) {
    // You must complete the logic for the function that is provided
    // before compiling or submitting to avoid an error.

    // Write your code here

    const reviewSum = {};

    for ( [id, rating] of ratings){
        if(reviewSum[id]){
            reviewSum[id] += rating;
        } else {
            reviewSum[id] = rating;
        }
    }

    let maxId = null;
    let maxSum = 0;

    for(const [id,total] of Object.entries(reviewSum)){
        const nId = parseInt(id, 10);
    
    if (total > maxSum || (total === maxSum && (maxId === null || nId < maxId))){
            maxId = nId;
            maxSum = total;
        }
    
    };

      console.log(maxId);
   
}

   

process.stdin.on('end', function () {
    input_ = input_.replace(/\n$/, "");
    input_ = input_.split("\n");

    var idx_ = 0;
    var N = parseInt(input_[idx_++].trim(), 10);
    var ratings = [];
    for(var i_ratings = 0; i_ratings < N; i_ratings++) {
    	ratings.push(input_[idx_++].trim().split(' ').map(function(el) {
    		return parseInt(el, 10);
    	}));
    }

    var out_ = solution( N,  ratings);
    process.stdout.write(out_.toString());

    process.exit();

});