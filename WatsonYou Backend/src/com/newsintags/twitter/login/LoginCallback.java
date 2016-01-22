package com.newsintags.twitter.login;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import twitter4j.ResponseList;
import twitter4j.Status;
import twitter4j.Twitter;
import twitter4j.TwitterException;
import twitter4j.TwitterFactory;
import twitter4j.auth.AccessToken;

/**
 * Servlet implementation class LoginCallback
 */
@WebServlet("/LoginCallback")
public class LoginCallback extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public LoginCallback() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Twitter twitternew =  (Twitter) request.getSession().getAttribute("twitter");
		try {
			System.out.println("value:" + twitternew.getScreenName());
		} catch (TwitterException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		/*
	    AccessToken accessToken;
		try {s
			accessToken = twitter.getOAuthAccessToken();
			twitter.setOAuthConsumer("0LwdiU3HyPoJohrgEQEdRShry", "bh6R3m4HSyom5VtkzIk9wDOHLqFk9PtLk6btHurwIo0jQuQ7pr");
		    twitter.setOAuthAccessToken(accessToken);
		} catch (TwitterException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}*/
		/*TwitterFactory factory = new TwitterFactory();
		Twitter twitter = factory.getInstance();
		System.out.println("Parameter :" + request.getParameter("oauth_token")+":"+request.getParameter("oauth_verifier"));
		AccessToken accessToken  = new AccessToken(request.getParameter("oauth_token"), request.getParameter("oauth_verifier"));
	    twitter.setOAuthConsumer("0LwdiU3HyPoJohrgEQEdRShry", "bh6R3m4HSyom5VtkzIk9wDOHLqFk9PtLk6btHurwIo0jQuQ7pr");
	    twitter.setOAuthAccessToken(accessToken);
	    try {
			System.out.println("Value" + twitter.getHomeTimeline());
		} catch (TwitterException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}*/
	   // twitter.setOAuthAccessToken( request.getParameter("oauthverfier"));
	    
		response.setContentType("application/json");
		 /*JSONObject tweets ;
		 JSONObject homelineTweets = new JSONObject();
		 JSONArray homelineTweetsArray = new JSONArray();
		ResponseList<Status> tweetsList;
		try {
			tweetsList = twitter.getHomeTimeline();
			for(Status tweet:tweetsList){
				tweets = new JSONObject();
				tweets.put("id", tweet.getId());
				tweets.put("text", tweet.getText());
				tweets.put("dateValue", tweet.getCreatedAt().getDate());
				tweets.put("source", tweet.getSource());
				tweets.put("favoriteCount", tweet.getFavoriteCount());
				
				homelineTweetsArray.put(tweets);
				
			}
			homelineTweets.put("homelineTweets", homelineTweetsArray);
			response.setContentType("application/json");
			response.getWriter().write(homelineTweets.toString());*/
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
