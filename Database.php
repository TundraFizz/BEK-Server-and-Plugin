<?php
header("Access-Control-Allow-Origin: *");
header("Cache-Control: max-age=5");
header("Content-Type: application/json; charset=UTF-8");

$host_address = "35.161.242.105";
//-- MySQL Configuration ------------------------------------------------
//-----------------------------------------------------------------------
$dbServer         = "localhost";
$dbUsername       = "root";
$dbPassword       = "eTIB47bO5Eumdz01";
$dbDatabase       = "fek";
$dbDefaultCharset = "utf8";
$db = new mysqli($dbServer, $dbUsername, $dbPassword, $dbDatabase);
mysqli_set_charset($db, $dbDefaultCharset);

//-- Twitter Configuration ----------------------------------------------
//-----------------------------------------------------------------------
$twitterConfig = array("api"       => "https://api.twitter.com/1.1/statuses/user_timeline.json",
                       "count"     => 5);

$twitterAccts = array(0 => array("screenName"             => "Tundra_Fizz",
                                 "oauthAccessToken"       => "2350703472-cP2lzDE7ew7DzgX5NUFvrEWYaOsikRjTASh1L8Z",
                                 "oauthAccessTokenSecret" => "AZgBZEUf2Aa50WP9hH26AzHnRow4aWbnVllgS83nIZCji",
                                 "consumerKey"            => "BNf5h2oVoTAVsE0WX0kzJ8G3V",
                                 "consumerKeySecret"      => "AT14GnDRjnuAMFQ5VJqBwqPvrAd11uvLS7pzkNSM1ggUrgL8tm"),

                      1 => array("screenName"             => "TundraFizzTest",
                                 "oauthAccessToken"       => "1366537352-bO2QYaqhij7FlqNBmqlENiiAvBSCKRPN1ILdzjW",
                                 "oauthAccessTokenSecret" => "lqvRw9YHweqjKJZTWHtoiPnWJxKj7OGz7E2xEPLK4KEa5",
                                 "consumerKey"            => "TvsvoV3WrM0kE4LF2d8B2JLTY",
                                 "consumerKeySecret"      => "tdJFBnyjrA8zTCAHECTWnt7JjbARs0FMcVCpf5Qh2vhVxEsveL"));

//-- API Keys -----------------------------------------------------------
//-----------------------------------------------------------------------
$apiKeys = array("8c8810a4-9eac-47a3-89c6-f84907ac867a",  // Tundra Fizz
                 "ab120493-4289-4496-81f8-3b7064055a11",  // Minimum Fizz
                 "efc4b9b9-0cbd-4ab5-8ca9-8d455c5358a0",  // Medium Fizz
                 "96d99434-adc2-4561-b0ea-ca98467dd117",  // Erotic Fizz
                 "d96782ac-df26-4e53-817e-c97a388567fd",  // Atlantean Fizz
                 "dba20000-eefd-41a8-b448-c1cc9b3e81c7",  // Void Fizz
                 "707bdd4d-e69e-44d2-ac81-a6168ebe670c",  // Fizz Scorch
                 "abb1c259-e2b1-426a-a5d1-70bee4dc9d7c"); // Urchin Strike
$chosen = mt_rand(0, count($apiKeys) - 1);

$response                      = array();
$response["records"]           = array();
$response["tweets"]            = array();
$response["tweets"]["records"] = array();

$fekAvatarStorage = "http://" . $host_address . "/avatars/";
$action = $_GET["action"];

///////////////////
// GetMemberData //
///////////////////
if($action == "GetOnlyAvatars")
{
  $users   = $_GET["users"];
  $regions = $_GET["regions"];
  $table   = "fek_users2";

  if($users != null)
  {
    // Now I can get all the member data I need
    $sqlprep = "SELECT username, region, boards_id FROM " . $table;
    $firstrun = true;

    foreach($users as $name)
    {
      if($firstrun)
      {
        $firstrun = false;
        $sqlprep = $sqlprep . " WHERE username='" . $name . "'";
      }
      else
      {
        $sqlprep = $sqlprep . " OR username='" . $name . "'";
      }
    }

    $sql = $sqlprep . ";";

    if(!$result = $db->query($sql))
    {
      $response["error"] = "There was an error running the FEK query";
    }
    else
    {
      // Process avatars
      for($name = 0; $name < sizeof($users); $name++)
      {
        $response["records"][$users[$name]]                  = array();
        $response["records"][$users[$name]][$regions[$name]] = array();
      }

      while($row = $result->fetch_assoc())
      {
        $found = FindAvatar($row["boards_id"], $row["region"], $fekAvatarStorage);

        if($found)
          $response["records"][$row["username"]][$row["region"]]["avatar"] = $found;
      }
    }
  }

  echo json_encode($response);
}
else if($action == "GetMemberData")
{
  $myName         = $_GET["myName"];
  $myRegion       = $_GET["myRegion"];
  $users          = $_GET["users"];
  $regions        = $_GET["regions"];
  $table          = "fek_users2";

  if($db->connect_errno > 0)
  {
    $response["records"]["error"] = "Unable to connect to FEK database.";
  }
  else
  {
    // If you are logged in
    if($myName != null)
    {
      if($myRegion == "EU Oeste" || // Spanish
         $myRegion == "EU Ouest" || // French
         $myRegion == "Eu Ovest" || // Italian
         $myRegion == "Westeuropa") // German
      {
        $myRegion = "EUW";
      }

      // Use Name/Region to get Boards ID/Name/Region
      $curl = curl_init("http://boards.na.leagueoflegends.com/api/users/" . $myRegion . "/" . str_replace(" ", "%20", $myName));

      curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
      curl_setopt($curl, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.9) Gecko/20071025 Firefox/2.0.0.9");
      $result = curl_exec($curl);
      $result = json_decode($result, true);
      curl_close($curl);

      $boardsId     = $result["id"];
      $boardsName   = $result["name"];
      $boardsRegion = $result["realm"];

      // Does Boards ID exist in FEK database?
      $sql = "SELECT * FROM `" . $table . "` WHERE `boards_id`='" . $boardsId . "';";
      $query = mysqli_query($db, $sql);
      $num_row = mysqli_num_rows($query);

      if($num_row == 0) // No
      {
        // Insert yourself into the table if you weren't found
        $sql = "INSERT INTO `fek`.`" . $table . "` (`boards_id`) VALUES ('" . $boardsId . "');";

        $db->query($sql);
        $response["records"]["top"]    = "14px";
        $response["records"]["color1"] = "#008000";
        $response["records"]["color2"] = "#006400";
        $response["records"]["font"]   = "#FFFFFF";
      }
        $row = $query->fetch_assoc();

        // Update FEK database and return OK
        $lastLogin = date("Y-m-d H:i:s");

        $sql = "UPDATE `" . $table . "` SET `username`='" . $boardsName . "', `region`='" . $boardsRegion . "', `last_login`='" . $lastLogin . "' WHERE `boards_id`='" . $boardsId . "';";
        $result = $db->query($sql);
    }

    // Get the version number
    $sql = "SELECT `version`, `details` FROM `fek`.`version`;";

    if($result = $db->query($sql))
    {
      if($row = $result->fetch_assoc())
      {
        $response["records"]["version"] = $row["version"];
        $response["records"]["details"] = $row["details"];
      }
    }

    $sql = "SELECT message, stream, thread, start, end FROM fek.event;";

    if($result = $db->query($sql))
    {
      if($row = $result->fetch_assoc())
      {
        $response["event"]["message"] = $row["message"];
        $response["event"]["stream"]  = $row["stream"];
        $response["event"]["thread"]  = $row["thread"];
        $response["event"]["start"]   = strtotime($row["start"]);
        $response["event"]["end"]     = strtotime($row["end"]);
      }
    }

    if($users != null)
    {
      // Now I can get all the member data I need
      $sqlprep = "SELECT `username`, `region`, `boards_id`, `last_login`, `donor`, `staff`, `title`, `badge` FROM `" . $table . "`";
      $firstrun = true;

      foreach($users as $name)
      {
        if($firstrun)
        {
          $firstrun = false;
          $sqlprep = $sqlprep . " WHERE username='" . $name . "'";
        }
        else
        {
          $sqlprep = $sqlprep . " OR username='" . $name . "'";
        }
      }

      $sql = $sqlprep . ";";

      if(!$result = $db->query($sql))
      {
        $response["error"] = "There was an error running the FEK query";
      }
      else
      {
        // Process avatars
        for($name = 0; $name < sizeof($users); $name++)
        {
          $response["records"][$users[$name]]                  = array();
          $response["records"][$users[$name]][$regions[$name]] = array();
        }

        while($row = $result->fetch_assoc())
        {
          $response["records"][$row["username"]][$row["region"]]["last_login"] = $row["last_login"];
          $response["records"][$row["username"]][$row["region"]]["donor"]      = $row["donor"];
          $response["records"][$row["username"]][$row["region"]]["staff"]      = $row["staff"];
          $response["records"][$row["username"]][$row["region"]]["title"]      = $row["title"];
          $response["records"][$row["username"]][$row["region"]]["badge"]      = $row["badge"];

          $found = FindAvatar($row["boards_id"], $row["region"], $fekAvatarStorage);

          if($found)
            $response["records"][$row["username"]][$row["region"]]["avatar"] = $found;
        }
      }
    }

    // Now we need to grab the twitter data from our database
    $sql = "SELECT * FROM `tweets` ORDER BY `tweets`.`id` DESC LIMIT 0 , " . $twitterConfig["count"];
    if(!$result = $db->query($sql))
    {
      $response["error"] = "There was an error grabbing cached twitter data";
    }
    else
    {
      $index = -1;
      while($row = $result->fetch_assoc())
      {
        $index++;

        $data = array("id"                                =>  $row["id"],
                      "id"                                =>  $row["id_str"],
                      "created_at"                        =>  $row["created_at"],
                      "text"                              =>  nl2br($row["text"]),
                      "user" => array("name"              =>  $row["name"],
                                      "screenName"        =>  $row["screen_name"],
                                      "profile_image_url" =>  $row["profile_image_url"]));

        array_push($response["tweets"]["records"], $data);
      }
    }

    mysqli_close($db);
    echo json_encode($response);
  }
}
else if($_GET["action"] == "GetTweets")
{
  foreach($twitterAccts as $account)
  {
    GetTweets($account, $twitterConfig, $db);
  }

  echo json_encode($response);
}
else if($_GET["action"] == "UpdateAvatars")
{
  $table = "fek_users2";

  $sql   = "SELECT boards_id, region FROM " . $table . ";";

  if($result = $db->query($sql))
  {
    while($row = $result->fetch_assoc())
    {
      $found = FindAvatar($row["boards_id"], $row["region"], $fekAvatarStorage);

      if($found)
      {
        $sql   = "UPDATE " . $table . " SET avatar='" . 1 . "' WHERE `boards_id`='" . $row["boards_id"] . "';";
        $db->query($sql);
      }
    }
  }
}
else if($_GET["action"] == "getWebPanel")
{
  $page = $_GET["page"];

  // Load the requested page html into the json
  $file = "webpanels/_" . $page . ".php";
  $html = trim(file_get_contents($file, true));
  $response["html"] = $html;
  echo json_encode($response);
}
else if($_GET["action"] == "getFriends")
{
  $boardsId;
  $response["html"] = "";
  $myName           = $_GET["myName"];
  $myRegion         = $_GET["myRegion"];

  if($myName != null)
  {
    if($myRegion == "EU Oeste" || // Spanish
       $myRegion == "EU Ouest" || // French
       $myRegion == "Eu Ovest" || // Italian
       $myRegion == "Westeuropa") // German
    {
      $myRegion = "EUW";
    }

    // Get your own boards_id
    $sql = "SELECT boards_id FROM fek_users2 WHERE username='" . $myName . "' and region='" . $myRegion . "';";
    if($result = $db->query($sql))
    {
      $row = $result->fetch_assoc();
      $boardsId = $row["boards_id"];
    }

    // Friends List
    $sql = "SELECT user_1, user_2 FROM pm_whitelist WHERE (user_1='" . $boardsId . "' or user_2='" . $boardsId . "') and friends='1';";

    if($result = $db->query($sql))
    {
      if(mysqli_num_rows($result))
        $response["html"] .= "<h1>Friends List</h1>";

      while($row = $result->fetch_assoc())
      {
        $sql = "";
        $friend;

        if  ($boardsId == $row["user_1"]) $friend = $row["user_2"];
        else                              $friend = $row["user_1"];

        $sql = "SELECT username, region FROM fek_users2 WHERE boards_id='" . $friend . "';";

        if($row = $db->query($sql)->fetch_assoc())
        {
          $response["html"] .= "
          <span style='text-align: left' id='" . $friend . "'>"  . $row["username"] . " (" . $row["region"] . ")
          <span style='float:      right'>

          <form>
          <input type='button' value='Remove' onClick='
          $.ajax(
          {
            dataType: \"json\",
            url: \"http://" . $host_address . "/fek/Database2.php\",
            data:
            {
              action: \"removeFriend\",
              friend: " . $friend . "
            }
          });

          $(\"#" . $friend . "\").remove();
          '>
          </form>
          </span>
          </span>
          <br><br>
          ";
        }
      }
    }

    // Incoming friend requests
    $sql = "SELECT user_1 FROM pm_whitelist WHERE user_2='" . $boardsId . "' and friends='0';";

    if($result = $db->query($sql))
    {
      if(mysqli_num_rows($result))
        $response["html"] .= "<h1>Incoming Friend Requests</h1>";

      while($row = $result->fetch_assoc())
      {
        $sql = "";
        $friend = $row["user_1"];

        if($friend)
        {
          $sql = "SELECT username, region FROM fek_users2 WHERE boards_id='" . $friend . "';";

          if($row = $db->query($sql)->fetch_assoc())
          {
            $response["html"] .= "
            <span style='text-align: left' id='" . $friend . "'>"  . $row["username"] . " (" . $row["region"] . ")
            <span style='float:      right'>" . "

            <form>
            <input type='button' value='Accept' onClick='
            $.ajax(
            {
              dataType: \"json\",
              url: \"http://" . $host_address . "/fek/Database2.php\",
              data:
              {
                action: \"acceptFriend\",
                myId:   " . $boardsId . ",
                friend: " . $friend   . "
              }
            });

            $(\"#" . $friend . "\").remove();
            '>

            <input type='button' value='Deny' onClick='
            $.ajax(
            {
              dataType: \"json\",
              url: \"http://" . $host_address . "/fek/Database2.php\",
              data:
              {
                action: \"removeFriend\",
                myId:   " . $boardsId . ",
                friend: " . $friend   . "
              }
            });

            $(\"#" . $friend . "\").remove();
            '>
            </form>
            </span>
            </span>
            <br><br>";
          }
        }
      }
    }

    // Add Friend
    $response["html"] .= "
    <h1>Add Friend</h1>
    <form onsubmit=\"return false\">
    <br>
    Name   <input id=\"inputName\" type=\"text\" name=\"name\">
    Region <select id=\"inputRegion\" name=\"region\">
             <option value=\"NA\">NA</option>
             <option value=\"OCE\">OCE</option>
             <option value=\"EUW\">EUW</option>
             <option value=\"EUNE\">EUNE</option>
           </select>
    <br><br>
    <input type='button' value='Submit' onClick='

    $.ajax(
    {
      dataType: \"json\",
      url: \"http://" . $host_address . "/fek/Database2.php\",
      data:
      {
        action:      \"addFriend\",
        myId:        " . $boardsId . ",
        theirName:   inputName.value,
        theirRegion: inputRegion.value
      }
      }).success(function(data)
      {
        if(data.result == \"1\")
          $(\"#messageNotice\").text(\"Friend request sent!\");
        else
          $(\"#messageNotice\").text(\"User doesn&#8217;t exist!\");

        $(\"#messageNotice\").addClass(\"visible\");

        setTimeout(function()
        {
          $(\"#messageNotice\").removeClass(\"visible\");
        }, 3000);
      });

      document.getElementById(\"inputName\").value = \"\";

    '>
    </form>
    ";

    echo json_encode($response);
  }
  else
  {
    $response["html"] .= "You aren't logged in.";
    echo json_encode($response);
  }
}
else if($_GET["action"] == "addFriend")
{
  $myId        = $_GET["myId"];
  $theirName   = $_GET["theirName"];
  $theirRegion = $_GET["theirRegion"];

  // Use Name/Region to get Boards ID
  $curl = curl_init("http://boards.na.leagueoflegends.com/api/users/" . $theirRegion . "/" . str_replace(" ", "%20", $theirName));

  curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($curl, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.9) Gecko/20071025 Firefox/2.0.0.9");
  $result = curl_exec($curl);
  $result = json_decode($result, true);
  curl_close($curl);

  $theirId = $result["id"];

  if($theirId)
  {
    $sql = "INSERT INTO pm_whitelist (user_1, user_2, friends) VALUES ('" . $myId . "', '" . $theirId . "', '0')";

    $db->query($sql);

    $response["result"] = "1";
    echo json_encode($response); // This is just to let the client know that this was successful
  }
  else
  {
    $response["result"] = "0";
    echo json_encode($response); // This is just to let the client know that this was successful
  }
}
else if($_GET["action"] == "acceptFriend")
{
  $friend = $_GET["friend"];

  $sql = "UPDATE pm_whitelist SET friends='1' WHERE user_1='" . $friend . "' or user_2='" . $friend . "';";

  $db->query($sql);
}
else if($_GET["action"] == "removeFriend")
{
  $friend = $_GET["friend"];

  $sql = "delete from pm_whitelist WHERE user_1='" . $friend . "' or user_2='" . $friend . "';";

  $db->query($sql);
}
else if($_GET["action"] == "messages")
{
  $boardsId;
  $response["html"] = "";
  $myName           = $_GET["myName"];
  $myRegion         = $_GET["myRegion"];

  if($myName != null)
  {
    if($myRegion == "EU Oeste" || // Spanish
       $myRegion == "EU Ouest" || // French
       $myRegion == "Eu Ovest" || // Italian
       $myRegion == "Westeuropa") // German
    {
      $myRegion = "EUW";
    }

    // Get your own boards_id
    $sql = "SELECT boards_id FROM fek_users2 WHERE username='" . $myName . "' and region='" . $myRegion . "';";
    if($result = $db->query($sql))
    {
      $row = $result->fetch_assoc();
      $boardsId = $row["boards_id"];
    }

    $fekMessage = 0;

    // Inbox
    $sql = "SELECT sender, message FROM pm_inbox WHERE (receiver='" . $boardsId . "');";

    if($result = $db->query($sql))
    {
      $response["html"] .= "<h1>Inbox</h1>";

      if(!mysqli_num_rows($result))
        $response["html"] .= "No messages.";

      while($row = $result->fetch_assoc())
      {
        // Display username, first
        $sql    = "SELECT id, username, region FROM fek_users2 WHERE boards_id='" . $row["sender"] . "';";
        $friend = $db->query($sql)->fetch_assoc();

        $response["html"] .= "
        <table style=\"width:100%\">
        <col width=\"35%\">
        <col width=\"65%\">
        <col width=\"0%\">
        <tr id='fekSubject" . $fekMessage . "'>";

        $response["html"] .= "<td>" . $friend["username"] . " (" . $friend["region"] . ")</td><td>";
        $response["html"] .=  "<div style='cursor: pointer;' onClick='

        if  ($(\"#fekMessage" . $fekMessage . "\").css(\"display\") == \"none\") $(\"#fekMessage" . $fekMessage . "\").show();
        else                                                                     $(\"#fekMessage" . $fekMessage . "\").hide();


        '>" . substr($row["message"], 0, 10) . "...</div>

        </td>
        <td>
          <form>
          <input type='button' value='Remove' onClick='
          $.ajax(
          {
            dataType: \"json\",
            url: \"http://" . $host_address . "/fek/Database2.php\",
            data:
            {
              action: \"deletePM\",
              table:  \"pm_inbox\",
              msgId:   " . $row["id"] . "
            }
          });

          $(\"#fekSubject" . $fekMessage . "\").remove();
          $(\"#fekMessage" . $fekMessage . "\").remove();
          '>
          </form>
        </td>

        </tr></table>

        <div id=\"fekMessage" . $fekMessage . "\" style=\"display: none\">

        <p>

        " . $row["message"] . "



        </div>

        ";

        $fekMessage++;
      }
    }

    // Outbox
    $sql = "SELECT id, receiver, message FROM pm_outbox WHERE (sender='" . $boardsId . "');";

    if($result = $db->query($sql))
    {
      $response["html"] .= "<h1>Outbox</h1>";

      if(!mysqli_num_rows($result))
        $response["html"] .= "No messages.";

      while($row = $result->fetch_assoc())
      {
        // Display username, first
        $sql    = "SELECT username, region FROM fek_users2 WHERE boards_id='" . $row["receiver"] . "';";
        $friend = $db->query($sql)->fetch_assoc();

        $response["html"] .= "
        <table style=\"width:100%\">
        <col width=\"35%\">
        <col width=\"65%\">
        <col width=\"0%\">
        <tr id='fekSubject" . $fekMessage . "'>";

        $response["html"] .= "<td>" . $friend["username"] . " (" . $friend["region"] . ")</td><td>";
        $response["html"] .=  "<div style='cursor: pointer;' onClick='

        if  ($(\"#fekMessage" . $fekMessage . "\").css(\"display\") == \"none\") $(\"#fekMessage" . $fekMessage . "\").show();
        else                                                                     $(\"#fekMessage" . $fekMessage . "\").hide();


        '>" . substr($row["message"], 0, 10) . "...</div>

        </td>
        <td>
          <form>
          <input type='button' value='Remove' onClick='
          $.ajax(
          {
            dataType: \"json\",
            url: \"http://" . $host_address . "/fek/Database2.php\",
            data:
            {
              action: \"deletePM\",
              table:  \"pm_outbox\",
              msgId:   " . $row["id"] . "
            }
          });

          $(\"#fekSubject" . $fekMessage . "\").remove();
          $(\"#fekMessage" . $fekMessage . "\").remove();
          '>
          </form>
        </td>

        </tr></table>

        <div id=\"fekMessage" . $fekMessage . "\" style=\"display: none\">

        <p>

        " . $row["message"] . "



        </div>

        ";





        $fekMessage++;
      }
    }

    echo json_encode($response);
  }
  else
  {
    $response["html"] .= "You aren't logged in.";
    echo json_encode($response);
  }
}
else if($_GET["action"] == "writePM")
{
  $boardsId;
  $response["html"] = "";
  $myName           = $_GET["myName"];
  $myRegion         = $_GET["myRegion"];

  if($myName != null)
  {
    // Get your own boards_id
    $sql = "SELECT boards_id FROM fek_users2 WHERE username='" . $myName . "' and region='" . $myRegion . "';";
    if($result = $db->query($sql))
    {
      $row = $result->fetch_assoc();
      $boardsId = $row["boards_id"];
    }

    // Get your friends
    $sql = "SELECT user_1, user_2 FROM pm_whitelist WHERE (user_1='" . $boardsId . "' or user_2='" . $boardsId . "') and friends='1';";

    if($result = $db->query($sql))
    {
      if(mysqli_num_rows($result))
        $response["html"] .= "
        <h1>Send a private message</h1>
        <form id=\"msgform\">
        Friend <select id=\"inputFriend\" name=\"friend\">
        ";

      while($row = $result->fetch_assoc())
      {
        $sql = "";
        $friend;

        if  ($boardsId == $row["user_1"]) $friend = $row["user_2"];
        else                              $friend = $row["user_1"];

        $sql = "SELECT username, region FROM fek_users2 WHERE boards_id='" . $friend . "';";

        if($row = $db->query($sql)->fetch_assoc())
        {
          $response["html"] .= "<option value=\"" . $friend . "\">" . $row["username"] . " (" . $row["region"] . ")</option>";
        }
      }

      if(mysqli_num_rows($result))
        $response["html"] .= "
        </select>

        <input type='button' value='Submit' onClick='
        $.ajax(
        {
          dataType: \"json\",
          url: \"http://" . $host_address . "/fek/Database2.php\",
          data:
          {
            action:  \"sendPM\",
            myId:    " . $boardsId . ",
            friend:  inputFriend.value,
            message: inputMessage.value
          }
        }).success(function(data)
        {
          $(\"#messageNotice\").text(\"Message sent!\");
          $(\"#messageNotice\").addClass(\"visible\");

          setTimeout(function()
          {
            $(\"#messageNotice\").removeClass(\"visible\");
          }, 3000);
        });

        document.getElementById(\"inputMessage\").value = \"\";

        '>

        </form>

        <br>

        <textarea rows=\"4\" cols=\"50\" name=\"inputMessage\" id=\"inputMessage\" form=\"msgform\"></textarea>
        ";
    }

    echo json_encode($response);
  }
  else
  {
    $response["html"] .= "You aren't logged in.";
    echo json_encode($response);
  }
}
else if($_GET["action"] == "sendPM")
{
  $myId    = $_GET["myId"];
  $friend  = $_GET["friend"];
  $message = $_GET["message"];

  if($message != "")
  {
    $sql = "INSERT INTO pm_inbox (sender, receiver, message) VALUES ('" . $myId . "', '" . $friend . "', '" . $message . "');";
    $db->query($sql);

    $sql = "INSERT INTO pm_outbox (sender, receiver, message) VALUES ('" . $myId . "', '" . $friend . "', '" . $message . "');";
    $db->query($sql);

    echo json_encode(""); // This is just to let the client know that this was successful
  }
}
else if($_GET["action"] == "deletePM")
{
  $table = $_GET["table"];
  $msgId = $_GET["msgId"];

  $sql = "DELETE FROM " . $table . " WHERE id='" . $msgId . "';";
  $db->query($sql);
}
else if($_GET["action"] == "wrenchmenIndex")
{
  $helpThreads = $_GET["helpThreads"];

  if($db->connect_errno > 0)
  {
    $response["records"]["error"] = "Unable to connect to FEK database.";
  }
  else
  {
    for($i = 0; $i < count($helpThreads); $i++)
    {
      $sql = "SELECT `thread_id`, `status` FROM `help_and_support` WHERE thread_id='" . $helpThreads[$i] . "';";

      if($result = $db->query($sql))
      {
        $row = $result->fetch_assoc();

        if(mysqli_num_rows($result))
        {
          $response["records"][$i]["status"] = $row["status"];
        }
        else
        {
          $response["records"][$i]["status"] = 0;
        }
      }
    }
  }

  mysqli_close($db);
  echo json_encode($response);
}
else if($_GET["action"] == "wrenchmenThread")
{
  $threadId = $_GET["threadId"];

  if($db->connect_errno > 0)
  {
    $response["records"]["error"] = "Unable to connect to FEK database.";
  }
  else
  {
    $sql = "SELECT `thread_id`, `status` FROM `help_and_support` WHERE thread_id='" . $threadId . "';";

    if($result = $db->query($sql))
    {
      $row = $result->fetch_assoc();

      if(mysqli_num_rows($result))
      {
        $response["records"]["status"] = $row["status"];
      }
      else
      {
        $response["records"]["status"] = "0";
      }
    }
  }

  mysqli_close($db);
  echo json_encode($response);
}
else if($_GET["action"] == "wrenchmenStatus")
{
  $threadId = $_GET["threadId"];
  $status   = $_GET["status"];

  if($db->connect_errno > 0)
  {
    $response["records"]["error"] = "Unable to connect to FEK database.";
  }
  else
  {
    $sql = "SELECT `thread_id`, `status` FROM `help_and_support` WHERE thread_id='" . $threadId . "';";
    $date = date("Y-m-d H:i:s");

    if($result = $db->query($sql))
    {
      $row = $result->fetch_assoc();

      if(mysqli_num_rows($result))
      {
        $sql = "UPDATE " . "`help_and_support`" . " SET `status`='" . $status . "' WHERE `thread_id`='" . $threadId . "';";
        $db->query($sql);
      }
      else
      {
        $sql = "INSERT INTO `fek`.`help_and_support` (`thread_id`, `status`, `date`) VALUES ('" . $threadId . "', '" . $status . "', '" . $date . "');";
        $db->query($sql);
      }

      $response["records"]["status"] = $status;
    }
  }

  mysqli_close($db);
  echo json_encode($response);
}
else
{
  $response["error"] = "Error: The requested action doesn't exist";
  echo json_encode($response);
}

//////////////////////////////////////////////////////////////////
// FindAvatar: Checks to see if a person has an avatar uploaded //
//////////////////////////////////////////////////////////////////
function FindAvatar($boardsID, $region, $fekAvatarStorage)
{
  $file = "../avatars/" . $region . "/" . $boardsID;

  $extensions = array("jpg", "jpeg", "bmp", "png", "gif", "webm");
  foreach($extensions as $extension)
  {
    if(file_exists($file.".".$extension))
    {
      return($fekAvatarStorage . $region . "/" . $boardsID . "." . $extension);
    }
  }
  return false;
}

////////////////////////////////////////////////////////////////////////////
// GenerateRandomString: Checks to see if a person has an avatar uploaded //
////////////////////////////////////////////////////////////////////////////
function GenerateRandomString($validChars, $length)
{
  $randomString = null;
  $numValidChars = strlen($validChars);

  for($i = 0; $i < $length; $i++)
  {
    $randomPick = mt_rand(1, $numValidChars);
    $randomChar = $validChars[$randomPick - 1];
    $randomString .= $randomChar;
  }

  return $randomString;
}

///////////////////////////////////////////////////////////////////////////////////////////
// CheckRunePageName: Checks a person's rune page name against their authentication code //
///////////////////////////////////////////////////////////////////////////////////////////
function CheckRunePageName($boardsId, $boardsName, $boardsRegion, $db, $table)
{
  $cleanName = $boardsName;
  $cleanName = preg_replace("/\s*/", "", $cleanName); // Remove spaces
  $cleanName = strtolower($cleanName);                // Lowercase

  if     ($boardsRegion == "NA")   $curl = curl_init("https://na.api.pvp.net/api/lol/"   . $boardsRegion . "/v1.4/summoner/by-name/" . str_replace(" ", "%20", $boardsName) . "?api_key=8c8810a4-9eac-47a3-89c6-f84907ac867a");
  else if($boardsRegion == "OCE")  $curl = curl_init("https://oce.api.pvp.net/api/lol/"  . $boardsRegion . "/v1.4/summoner/by-name/" . str_replace(" ", "%20", $boardsName) . "?api_key=8c8810a4-9eac-47a3-89c6-f84907ac867a");
  else if($boardsRegion == "EUW")  $curl = curl_init("https://euw.api.pvp.net/api/lol/"  . $boardsRegion . "/v1.4/summoner/by-name/" . str_replace(" ", "%20", $boardsName) . "?api_key=8c8810a4-9eac-47a3-89c6-f84907ac867a");
  else if($boardsRegion == "EUNE") $curl = curl_init("https://eune.api.pvp.net/api/lol/" . $boardsRegion . "/v1.4/summoner/by-name/" . str_replace(" ", "%20", $boardsName) . "?api_key=8c8810a4-9eac-47a3-89c6-f84907ac867a");

  curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
  $result = curl_exec($curl);
  $result = json_decode($result, true);
  if($result["status"]["status_code"]) return $result["status"]["status_code"];
  $summonerId = $result[$cleanName]["id"];
  curl_close($curl);

  if     ($boardsRegion == "NA")   $curl = curl_init("https://na.api.pvp.net/api/lol/"   . $boardsRegion . "/v1.4/summoner/" . $summonerId . "/runes?api_key=8c8810a4-9eac-47a3-89c6-f84907ac867a");
  else if($boardsRegion == "OCE")  $curl = curl_init("https://oce.api.pvp.net/api/lol/"  . $boardsRegion . "/v1.4/summoner/" . $summonerId . "/runes?api_key=8c8810a4-9eac-47a3-89c6-f84907ac867a");
  else if($boardsRegion == "EUW")  $curl = curl_init("https://euw.api.pvp.net/api/lol/"  . $boardsRegion . "/v1.4/summoner/" . $summonerId . "/runes?api_key=8c8810a4-9eac-47a3-89c6-f84907ac867a");
  else if($boardsRegion == "EUNE") $curl = curl_init("https://eune.api.pvp.net/api/lol/" . $boardsRegion . "/v1.4/summoner/" . $summonerId . "/runes?api_key=8c8810a4-9eac-47a3-89c6-f84907ac867a");

  curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
  $result = curl_exec($curl);
  $result = json_decode($result, true);
  if($result["status"]["status_code"]) return $result["status"]["status_code"];
  $runePage = $result[$summonerId]["pages"][0]["name"];
  curl_close($curl);

  $sql = "SELECT * FROM `" . $table . "` WHERE `boards_id`='" . $boardsId . "' AND `auth_code`='" . $runePage . "';";
  $query = mysqli_query($db, $sql);
  $num_row = mysqli_num_rows($query);

  return $num_row;
}

/////////////////////////////////////////////////////////////
// HandleErrors: Handles errors that occur from Riot's API //
/////////////////////////////////////////////////////////////
function HandleErrors($num_row)
{
  if($num_row ==  400) return "Bad Request";
  if($num_row ==  401) return "Unauthorized";
  if($num_row ==  404) return "Not Found";
  if($num_row ==  429) return "Rate Limit Exceeded";
  if($num_row ==  500) return "Internal Server Error";
  if($num_row ==  503) return "Service Unavailable";
}

/////////////////////////////////////////////////////////
// GetTweets: Retrieves new tweets using Twitter's API //
/////////////////////////////////////////////////////////
function GetTweets($twitterAcct, $twitterConfig, $db)
{
  $url = $twitterConfig["api"];
  $oauth = array("oauth_consumer_key"     => $twitterAcct["consumerKey"],
                 "oauth_nonce"            => time(),
                 "oauth_signature_method" => "HMAC-SHA1",
                 "oauth_token"            => $twitterAcct["oauthAccessToken"],
                 "oauth_timestamp"        => time(),
                 "oauth_version"          => "1.0",
                 "screenName"             => $twitterAcct["screenName"],
                 "exclude_replies"        => "true",
                 "count"                  => $twitterConfig["count"]);

  $base_info                = BuildBaseString($url, "GET", $oauth);
  $composite_key            = rawurlencode($twitterAcct["consumerKeySecret"]) . "&" . rawurlencode($twitterAcct["oauthAccessTokenSecret"]);
  $oauth_signature          = base64_encode(hash_hmac("sha1", $base_info, $composite_key, true));
  $oauth["oauth_signature"] = $oauth_signature;

  $header = array(BuildAuthorizationHeader($oauth), "Expect:");

  $options = array(CURLOPT_HTTPHEADER     => $header,
                   CURLOPT_HEADER         => false,
                   CURLOPT_URL            => $url . "?screenName=" . $twitterAcct["screenName"] . "&count=" . $twitterConfig["count"] . "&exclude_replies=true",
                   CURLOPT_RETURNTRANSFER => true,
                   CURLOPT_SSL_VERIFYPEER => false);

  $feed = curl_init();
  curl_setopt_array($feed, $options);
  $twitter_json = curl_exec($feed);
  curl_close($feed);

  $twitter_data = json_decode($twitter_json);

  // Iterate over our tweets
  $index = -1;
  foreach($twitter_data as $value)
  {
    $index++;
    // $t_id                = $twitter_data[$index]->id;
    $t_id_str            = $twitter_data[$index]->id_str;
    $t_created_at        = $twitter_data[$index]->created_at;
    $t_name              = $twitter_data[$index]->user->name;
    $t_screen_name       = $twitter_data[$index]->user->screen_name;
    $t_profile_image_url = $twitter_data[$index]->user->profile_image_url;
    $t_text              = $twitter_data[$index]->text;

    $checkIfFek = substr($t_text, -4);
    if($checkIfFek == "#FEK")
    {
      $t_text = str_replace("#FEK", " ", $t_text);

      $sql = "INSERT IGNORE INTO `tweets` (`id`, `created_at`,`name`,`screen_name`,`profile_image_url`,`text`) VALUES (?,?,?,?,?,?);";
      $stmt = $db->prepare($sql);
      $stmt->bind_param("ssssss", $t_id_str, $t_created_at, $t_name, $t_screen_name, $t_profile_image_url, $t_text);
      $stmt->execute();
      $stmt->close();
    }
  }
}

////////////////////////////////////////////////////
// BuildBaseString: Helper function for GetTweets //
////////////////////////////////////////////////////
function BuildBaseString($baseURI, $method, $params)
{
  $r = array();
  ksort($params);

  foreach($params as $key=>$value)
  {
    $r[] = "$key=" . rawurlencode($value);
  }

  return $method."&" . rawurlencode($baseURI) . "&" . rawurlencode(implode("&", $r));
}

/////////////////////////////////////////////////////////////
// BuildAuthorizationHeader: Helper function for GetTweets //
/////////////////////////////////////////////////////////////
function BuildAuthorizationHeader($oauth)
{
  $r = "Authorization: OAuth ";
  $values = array();

  foreach($oauth as $key=>$value)
  {
      $values[] = "$key=\"" . rawurlencode($value) . "\"";
  }

  $r .= implode(", ", $values);
  return $r;
}

?>
