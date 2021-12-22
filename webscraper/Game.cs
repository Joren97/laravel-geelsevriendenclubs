using System;
using System.Collections.Generic;
using System.Text;

namespace webscraper
{
    public class Game
    {
        public int Id { get; set; }
        public string Date { get; set; }
        public string Hour { get; set; }
        public Club Club1 { get; set; }
        public Club Club2 { get; set; }
        public DateTime DateTime { get; set; }
        public int? OutTeamScore { get; internal set; }
        public int? HomeTeamScore { get; internal set; }
        public bool IsCup { get; internal set; }
    }
}