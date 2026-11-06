"""Contrat de la carte QR parlante DIGIY : deux voix, 7,5 s, QR officiel inchangé."""
from pathlib import Path
from hashlib import sha1
import unittest

ROOT=Path(__file__).resolve().parents[1]
HTML=(ROOT/"index.html").read_text(encoding="utf-8")
JS=(ROOT/"assets/digiy-official-card-models-75-v1.js").read_text(encoding="utf-8")
VOICES={
 "thomas":("assets/digiy-qr-parlant-thomas-75.mp4","9e7a136bdbd8b4ac4bf4ee8043c4829cd5d97516"),
 "amelie":("assets/digiy-qr-parlant-amelie-75.mp4","691ee391e10e70e72076e6316faa6d50e0e7bb70"),
}

class DigiyQRVoice(unittest.TestCase):
 def test_original_official_qr_and_card_not_replaced(self):
  self.assertIn('href="https://digiylyfe.com/carte/"',HTML)
  self.assertIn('src="https://digiylyfe.com/carte-visite-digiy.png"',HTML)
  self.assertIn('src="/assets/digiy-officiel-final-9x16.png"',HTML)
  self.assertIn('/assets/digiy-officiel-animation-75-9x16.gif',JS)
 def test_video_assets_are_real_unchanged_mp4(self):
  for voice,(path,expected_sha) in VOICES.items():
   with self.subTest(voice=voice):
    raw=(ROOT/path).read_bytes()
    self.assertTrue(100_000<len(raw)<4_000_000)
    self.assertEqual(raw[4:8],b'ftyp')
    self.assertEqual(sha1(b'blob '+str(len(raw)).encode()+b'\0'+raw).hexdigest(),expected_sha)
    self.assertIn('/'+path,JS)
 def test_audio_only_on_user_action_and_late_loading(self):
  self.assertIn('id="digiySpeakThomas"',HTML)
  self.assertIn('id="digiySpeakAmelie"',HTML)
  self.assertIn('id="digiySpeakingVideo"',HTML)
  self.assertIn('playsinline preload="none"',HTML)
  self.assertNotIn('autoplay',HTML[HTML.index('id="digiySpeakingVideo"'):HTML.index('id="digiySpeakingFinal"')])
  self.assertIn("thomasButton.addEventListener('click',function(){playVoice('thomas');})",JS)
  self.assertIn("amelieButton.addEventListener('click',function(){playVoice('amelie');})",JS)
  self.assertIn('speakingVideo.play()',JS)
  self.assertIn("speakingVideo.addEventListener('ended',endSpeaking)",JS)
  self.assertIn('speakingFinal.hidden=false',JS)
  self.assertIn('speakingVideo.pause()',JS)
 def test_ten_languages_and_replay(self):
  for lang in ('fr','wo','zh','en','es','pt','it','de','nl','ar'):
   self.assertIn('      '+lang+':[',HTML)
  self.assertIn('if(thomasBtn)thomasBtn.textContent=cardLabels[3]',HTML)
  self.assertIn('if(amelieBtn)amelieBtn.textContent=cardLabels[4]',HTML)
  self.assertIn('replay.dataset.voiceActive',JS)
  self.assertIn('if(activeVoice)playVoice(activeVoice)',JS)

if __name__=="__main__":
 unittest.main()
