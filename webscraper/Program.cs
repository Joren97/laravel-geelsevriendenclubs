using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace webscraper
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            var clubs = ScrapeClubsAndPlayersFromGeelsevriendenclubs();

            string url = "http://geelsevriendenclubs.be/PHP7/index.php?pagina=kalender";
            var response = CallUrl(url).Result;
            var x = ParseHtml(response);
            var descendants = x.DocumentNode.Descendants().ToList();
            var y = descendants.Where(x => x.Name == "table").ToList().Last();
            var rows = y.ChildNodes.ToList();
            var date = "";
            var games = new List<Game>();
            int gameCounter = 1;
            foreach (var row in rows)
            {
                var childnodes = row.ChildNodes.ToList();
                if (childnodes.Count() < 1) continue;
                if (childnodes.First().InnerText != "")
                {
                    date = childnodes.First().InnerText;
                }
                else
                {
                    bool isCup = false;
                    int? homeTeamScore = null;
                    int? outTeamScore = null;

                    var hour = childnodes[1].InnerText.Trim();
                    var club1 = childnodes[2].InnerText.Trim();
                    var club2 = childnodes[3].InnerText.Trim();

                    if (childnodes.Count > 6)
                    {
                        if (childnodes[6].InnerText.Contains("Bekerwedstrijd"))
                            isCup = true;
                    }

                    if (childnodes.Count > 7)
                    {
                        var score = childnodes[8].InnerText.Trim();
                        if (!string.IsNullOrWhiteSpace(score))
                        {
                            homeTeamScore = int.Parse(score.Substring(0, score.IndexOf("-")).Trim());
                            outTeamScore = int.Parse(score.Substring(score.IndexOf("-") + 1).Trim());
                        }
                    }

                    var club1Obj = clubs.FirstOrDefault(x => x.Name == club1);
                    var club2Obj = clubs.FirstOrDefault(x => x.Name == club2);

                    if (club1Obj != null && club2Obj != null)
                    {
                        var day = int.Parse(date.Split('/')[0]);
                        var month = int.Parse(date.Split('/')[1]);
                        var year = month < 9 ? 2022 : 2021;
                        Regex regexObj = new Regex(@"[^\d]");
                        var time = regexObj.Replace(hour, "");
                        var minutes = 0;
                        if (time.Length == 4)
                        {
                            minutes = int.Parse(time.Substring(2, 2));
                            time = time.Substring(0, 2);
                        }

                        games.Add(new Game
                        {
                            Id = gameCounter,
                            Club1 = club1Obj,
                            Club2 = club2Obj,
                            Date = date,
                            Hour = hour,
                            DateTime = new DateTime(year, month, day, int.Parse(time), minutes, 0),
                            HomeTeamScore = homeTeamScore,
                            OutTeamScore = outTeamScore,
                            IsCup = isCup
                        });

                        gameCounter++;
                    }
                }
            }

            var z = games;

            System.IO.File.WriteAllText("geelsevriendenclubs.sql", "");

            string clubSql = string.Empty;
            string gameSql = string.Empty;
            string personSql = string.Empty;
            string teamInGameSql = string.Empty;

            foreach (var club in clubs)
            {
                clubSql += $"INSERT INTO teams (id, name, address, postalCode,city,color1,color2,color3,balance, created_at, updated_at)" +
                    $" VALUES ({club.Id},\"{club.Name}\", '', '', '', '','','',75, '', '');\n";
            }

            foreach (var game in games)
            {
                string homeTeamScore = game.HomeTeamScore.HasValue ? game.HomeTeamScore.Value.ToString() : "null";
                string outTeamScore = game.OutTeamScore.HasValue ? game.OutTeamScore.Value.ToString() : "null";

                gameSql += $"INSERT INTO games (id, homeTeamId, outTeamId, homeTeamScore, outTeamScore, dateTime, isCup, isCancelled, created_at, updated_at)" +
                    $" VALUES ('',{game.Club1.Id}, {game.Club2.Id}, {homeTeamScore}, {outTeamScore}, \"{game.DateTime:yyyy-MM-dd HH:mm:ss}\", {game.IsCup}, 0, '', '');\n";
                //teamInGameSql += $"INSERT INTO game_team (id, team_id, game_id, goalsScored, ishomeTeam, created_at, updated_at)" +
                //    $" VALUES ('', {game.Club1.Id}, {game.Id}, 0, 1, '', '');\n";
                //teamInGameSql += $"INSERT INTO game_team (id, team_id, game_id, goalsScored, ishomeTeam, created_at, updated_at)" +
                //    $" VALUES ('', {game.Club2.Id}, {game.Id}, 0, 0, '', '');\n";
            }

            foreach (var club in clubs)
            {
                foreach (var p in club.Players)
                {
                    personSql += $"INSERT INTO people (id, team_id, firstName, lastName, address, postalCode, city, email, tel, birthdate, playerNumber, created_at, updated_at)" +
                       $" VALUES ('', {club.Id}, \"{p.FistName}\", \"{p.LastName}\",'','','','','','', \"{p.PlayerNumber}\", '','');\n";
                }
            }

            System.IO.File.AppendAllText("geelsevriendenclubs.sql", clubSql);
            System.IO.File.AppendAllText("geelsevriendenclubs.sql", "\n\n");
            System.IO.File.AppendAllText("geelsevriendenclubs.sql", gameSql);
            System.IO.File.AppendAllText("geelsevriendenclubs.sql", "\n\n");
            System.IO.File.AppendAllText("geelsevriendenclubs.sql", personSql);
            System.IO.File.AppendAllText("geelsevriendenclubs.sql", "\n\n");
            //System.IO.File.AppendAllText("geelsevriendenclubs.sql", teamInGameSql);
            //CreateClubsSql(clubs);
        }

        private static List<Club> ScrapeClubsAndPlayersFromGeelsevriendenclubs()
        {
            var clubs = new List<Club>();
            var playerCounter = 1;
            var teamId = 1;

            for (int i = 0; i < 100; i++)
            {
                var club = GetClubInfo(i, teamId, ref playerCounter);

                if (club != null && club.Players.Count() != 0)
                {
                    club.Id = teamId;
                    clubs.Add(club);
                    teamId++;
                }
            }

            return clubs;
        }

        private static void CreateGamesSql(List<Game> games)
        {
            var counter = 1;
            var fileCounter = 1;

            foreach (var game in games)
            {
                string filename = $"games-{fileCounter}.csv";

                if (!File.Exists(filename))
                {
                    string clientHeader = "Date,Time,Venue,Home,Away" + Environment.NewLine;
                    File.WriteAllText(filename, clientHeader);
                }

                var playerString = $"{game.DateTime:dd/MM/yyyy},{game.DateTime:HH:mm},,{game.Club1.Name},{game.Club2.Name}\n";
                File.AppendAllText(filename, playerString);
                counter++;

                if (counter % 100 == 0)
                    fileCounter++;
            }
        }

        private static void CreateClubsSql(List<Club> clubs)
        {
            string clubSql = string.Empty;
            string playerSql = string.Empty;

            foreach (var club in clubs)
            {
                clubSql += $"INSERT INTO Teams (id, name, balance) VALUES ('{club.Id}', \"{club.Name}\", 75);\n";

                foreach (var player in club.Players)
                {
                    playerSql += $"INSERT INTO People (id, teamId, firstname, lastname, playernumber, persontype) VALUES ('{player.Id}', '{club.Id}', '{player.FistName}', '{player.LastName}', {player.PlayerNumber}, 0);\n";
                }
            }

            string fullSql = clubSql + playerSql;

            System.IO.File.WriteAllText("geelsevriendenclubs.sql", fullSql);
        }

        private static Club GetClubInfo(int i, int teamId, ref int playerCounter)
        {
            string url = "http://geelsevriendenclubs.be/PHP7/index.php?pagina=clubinfo&id=" + i;
            var response = CallUrl(url).Result;
            var x = ParseHtml(response);
            var descendants = x.DocumentNode.Descendants().ToList();
            var club = GetClub(descendants, teamId);

            if (string.IsNullOrWhiteSpace(club.Name))
                return null;

            var anodes = descendants.Where(x => x.GetAttributeValue("href", "").Contains("spelerinfo")).ToList();

            var persons = new List<Person>();

            foreach (var node in anodes)
            {
                var person = GetPerson(node, teamId, playerCounter);
                if (person != null && person.FistName.IndexOfAny(new char[] { '.', '(', ')' }) == -1 && person.LastName.IndexOfAny(new char[] { '.', '(', ')' }) == -1)
                {
                    club.Players.Add(person);
                    playerCounter++;
                }
            }

            return club;
        }

        private static Club GetClub(List<HtmlNode> descendants, int id)
        {
            var contentRightNode = descendants.FirstOrDefault(x => x.GetAttributeValue("id", "") == "contentrechts");
            var clubInfoNode = contentRightNode.Descendants().FirstOrDefault(x => x.Name == "u");
            return new Club() { Id = id, Name = clubInfoNode.InnerText, Players = new List<Person>() };
        }

        private static Person GetPerson(HtmlNode node, int teamId, int counter)
        {
            var text = node.InnerText.Trim();
            text = Regex.Replace(text, @"[\d-]", string.Empty);

            var lastSpace = text.LastIndexOf(" ");

            if (lastSpace == -1)
                return null;

            var firstName = text.Substring(lastSpace).Trim();
            var lastName = text.Substring(0, lastSpace).Trim();

            ChangeToCapitalLetters(ref lastName, " ");
            ChangeToCapitalLetters(ref lastName, "-");
            ChangeToCapitalLetters(ref firstName, " ");
            ChangeToCapitalLetters(ref firstName, "-");

            return new Person()
            {
                Id = counter,
                PlayerNumber = counter,
                TeamId = teamId,
                FistName = firstName,
                LastName = lastName
            };
        }

        private static async Task<string> CallUrl(string fullUrl)
        {
            HttpClient client = new HttpClient();
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls13;
            client.DefaultRequestHeaders.Accept.Clear();
            var response = client.GetStringAsync(fullUrl);
            return await response;
        }

        private static HtmlDocument ParseHtml(string html)
        {
            HtmlDocument htmlDoc = new HtmlDocument();
            htmlDoc.LoadHtml(html);
            return htmlDoc;
        }

        private static void ChangeToCapitalLetters(ref string name, string symbol)
        {
            if (name == "") return;

            name = name.Substring(0, 1).ToUpper() + name.Substring(1);
            int positie = name.IndexOf(symbol);
            int startpositie;
            while (positie != -1)
            {
                name = name.Substring(0, positie + 1) + name.Substring(positie + 1, 1).ToUpper() + name.Substring(positie + 2);
                startpositie = positie + 1;
                positie = name.IndexOf(symbol, startpositie);
            }
        }
    }
}