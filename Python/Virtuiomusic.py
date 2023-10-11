import vlc
import time
import cv2
import mediapipe as mp
import numpy as np
import time
from pynput.keyboard import Key, Controller		# for playing the song


MAIN_POINTS = [0, 4, 8, 12, 16, 20]		# landmarks on top of fingers
LANDMARK_CIRCLE_SIZE = 5
CIRCLE_COLOR = (255, 255, 0)
keyboard = Controller()


class VirtualMusic():
	def __init__(self):
		self.app_running = True
		self.player_mode = None 			# MC or 2P Modes
		# 1 for MC, 2 for 2P

		# have to spend time to let change things again (for robustness).
		# So defined these parameter.
		self.min_time_let_change_mode = 5. 		# sec
		self.min_time_let_change_music = 5.		# sec
		self.min_time_let_change_volume = 3.	# sec
		t_now = time.time()
		self.last_change_mode = t_now
		self.last_change_music = t_now
		self.last_change_volume = t_now

		self.new_mode_change = False			# begining in MC mode
		self.hands_index_last_x = None 			# last x, used to calculate velocity
		self.hands_index_last_y = None 			# last y, used to calculate velocity
		self.change_music_threshold = 0.2 		# threshold for horizontal velocity of
		# hands

		self.increase_music_volume = 0.2 		# threshold for vertical velocity of
		# hands

		self.change_mode_threshold = 0.15 		# distance threshold for index finger
		# and wrist

		self.table_y = 0.69
		# The hand in image should be lower than this value to cosider as touching
		# the table
		self.parts = [0., 0.09, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.99]
		# Key boundaries in width of image

		self.mid_line = 0.43
		# Key baoundaries in height of image

		self.key = {"left": None, "right": None}
		self.musics = [vlc.MediaPlayer("files/musics/1.mp3"),
		vlc.MediaPlayer("files/musics/2.mp3")]
		# Two songs for MC Mode

		self.hands_in_part = {"left": None, "right": None}
		self.hands_touched = {"left": False, "right": False}
		self.hands_touched_last = {"left": [False]*3,
		"right": [False]*3}

		self.prepare_sounds()
		# Determine paino keys, then loading them

		self.prepare_caps()

		# Making two hand detection models for two cameras
		self.hands_model0 = mp.solutions.hands.Hands(static_image_mode=False,
			min_detection_confidence=0.7,
			min_tracking_confidence=0.5)
		self.hands_model1 = mp.solutions.hands.Hands(static_image_mode=False,
			min_detection_confidence=0.7,
			min_tracking_confidence=0.5)


	def run(self):
		# Main function, Iterating over time

		while self.cap0.isOpened() and self.cap1.isOpened() \
		and self.app_running:
			ret0, self.frame0 = self.cap0.read()
			ret1, self.frame1 = self.cap1.read()
			if ret0 and ret1:
				self.prepare_frames()

				self.extract_landmarks()

				self.determine_hands()

				self.check_player_mode()

				if self.player_mode == 1:
					self.play_music()

					self.change_volume()

				elif self.player_mode == 2:
					self.check_section()

					self.check_near_table()

					self.play_keys()

				self.add_landmarks2img()

				self.show_frame()


	def extract_landmarks(self):
		# Extracing landmarks in both images of two cameras

		# Detecting all hands in each image
		lms0 = self.hands_model0.process(
			self.frame0_rgb).multi_hand_landmarks
		lms1 = self.hands_model1.process(
			self.frame1_rgb).multi_hand_landmarks

		# Getting the hand landmarks and putting them to a numpy array
		self.landmarks2hand0 = []
		if lms0:
			for lm in lms0:
				self.landmarks2hand0.append(
					np.array([(point.x, point.y) \
						for point in lm.landmark]))


		self.landmarks2hand1 = []
		if lms1:
			for lm in lms1:
				self.landmarks2hand1.append(
					np.array([(point.x, point.y) \
						for point in lm.landmark]))


	def prepare_frames(self):
		# Getting ready for feeding images to hand detection models

		self.frame0 = cv2.flip(self.frame0, 1)
		self.frame1 = cv2.flip(self.frame1, 0)
		self.frame1 = cv2.flip(self.frame1, 1)

		self.frame0_rgb = cv2.cvtColor(self.frame0, cv2.COLOR_BGR2RGB)
		self.frame1_rgb = cv2.cvtColor(self.frame1, cv2.COLOR_BGR2RGB)


	def prepare_caps(self):
		# Preparing caps. Determine minimum FPS, width and height
		# in them. Then set these parameters same for both caps.

		cap0 = cv2.VideoCapture(0)			# for front view
		cap1 = cv2.VideoCapture(1)			# for top view

		fps_min = min(cap0.get(cv2.CAP_PROP_FPS),
			cap1.get(cv2.CAP_PROP_FPS))
		size_min = min(cap0.get(cv2.CAP_PROP_FRAME_WIDTH),
			cap1.get(cv2.CAP_PROP_FRAME_WIDTH)), \
		min(cap0.get(cv2.CAP_PROP_FRAME_HEIGHT),
			cap1.get(cv2.CAP_PROP_FRAME_HEIGHT))

		cap0.set(cv2.CAP_PROP_FPS, fps_min)
		cap1.set(cv2.CAP_PROP_FPS, fps_min)
		cap0.set(cv2.CAP_PROP_FRAME_WIDTH, size_min[0])
		cap1.set(cv2.CAP_PROP_FRAME_WIDTH, size_min[0])
		cap0.set(cv2.CAP_PROP_FRAME_HEIGHT, size_min[1])
		cap1.set(cv2.CAP_PROP_FRAME_HEIGHT, size_min[1])

		self.cap0 = cap0
		self.cap1 = cap1
		self.size_min = size_min


	def prepare_sounds(self):
		self.key_names = ["Gb3", "G3", "Ab3", "A3", "Bb3", "B3",
		"C4", "Db4", "D4", "Eb4", "E4", "F4", "Gb4",
		"G4", "Ab4", "A4", "Bb4", "B4"]

		self.key_sounds = {}
		for kn in self.key_names:
			self.key_sounds[kn] = vlc.MediaPlayer(
				"files/keys/" + kn + ".mp3")


	def show_frame(self):
		frame = np.concatenate([self.frame0, self.frame1], 1)

		cv2.imshow("Frame", frame)
		q = cv2.waitKey(1)
		if (q == ord('q')) or (q == ord("Q")):
			self.app_running = False


	def add_landmarks2img(self):
		# Just for show

		for lm in self.landmarks2hand0:
			for indx in MAIN_POINTS:
				lm[indx, lm[indx] < 0] = 0.
				point_scaled = (lm[indx] * self.size_min).astype(np.uint32)
				cv2.circle(self.frame0, point_scaled,
					LANDMARK_CIRCLE_SIZE, CIRCLE_COLOR, cv2.FILLED)

		for lm in self.landmarks2hand1:
			for indx in MAIN_POINTS:
				lm[indx, lm[indx] < 0] = 0.
				point_scaled = (lm[indx] * self.size_min).astype(np.uint32)
				cv2.circle(self.frame1, point_scaled,
					LANDMARK_CIRCLE_SIZE, CIRCLE_COLOR, cv2.FILLED)


	def determine_hands(self):
		# Will find which landmark groups are for which hand (left or right)
		# Consideration 1: Hands never cross each other
		# Consideration 2: The detected hand in left half of the image
		# will be considered as left hand and vice versa for other half of the image.
		# This function isn't the best thing ever. I didn't have enough time to
		# implement a better solution.

		landmarks2hand0 = self.landmarks2hand0
		landmarks2hand1 = self.landmarks2hand1
		hands0 = {"left": None, "right": None}
		hands1 = {"left": None, "right": None}

		if len(landmarks2hand0) == 1:
			# In condition that one hand is detected
			if landmarks2hand0[0][MAIN_POINTS[2], 0] < 0.5:
				hands0["left"] = landmarks2hand0[0]
			else:
				hands0["right"] = landmarks2hand0[0]

		elif len(landmarks2hand0) == 2:
			# In condition that two hands are detected
			hands0["left"] = landmarks2hand0[0]
			hands0["right"] = landmarks2hand0[1]
			if landmarks2hand0[0][MAIN_POINTS[-1], 0] < \
			landmarks2hand0[1][MAIN_POINTS[-1], 0]:
				hands0["left"] = landmarks2hand0[1]
				hands0["right"] = landmarks2hand0[0]

		if len(landmarks2hand1) == 1:
			if landmarks2hand1[0][MAIN_POINTS[2], 0] < 0.5:
				hands1["left"] = landmarks2hand1[0]
			else:
				hands1["right"] = landmarks2hand1[0]

		elif len(landmarks2hand1) == 2:
			hands1["left"] = landmarks2hand1[1]
			hands1["right"] = landmarks2hand1[0]
			if landmarks2hand1[0][MAIN_POINTS[-1], 0] < \
			landmarks2hand1[1][MAIN_POINTS[-1], 0]:
				hands1["left"] = landmarks2hand1[0]
				hands1["right"] = landmarks2hand1[1]

		self.hands0 = hands0 			# hands in front view
		self.hands1 = hands1 			# hands in top view


	def check_section(self):
		# Calculate the hands are on which key (section). This implementation
		# can improve more.

		lower_keys = [1, 3, 5, 6, 8, 10, 11, 13, 15, 17]
		hands_in_part = {"left": None, "right": None}
		parts = self.parts
		mid_line = self.mid_line
		for hn in self.hands1:
			if self.hands1[hn] is not None:
				if self.hands1[hn][MAIN_POINTS[2], 1] > mid_line:
					for j in range(len(parts)-1):
						if (parts[j] < self.hands1[hn][MAIN_POINTS[2], 0] \
							< parts[j+1]):
							hands_in_part[hn] = lower_keys[j]
							break
				elif self.hands1[hn][MAIN_POINTS[2], 1] <= mid_line:
					if (parts[0] + (parts[1] - parts[0])/2) > self.hands1[hn][
					MAIN_POINTS[2], 0] > parts[0]:
						hands_in_part[hn] = 0
					elif (parts[1] + (parts[2] - parts[1])/2) > self.hands1[hn][
					MAIN_POINTS[2], 0] > (parts[1] - (parts[1] - parts[0])/2):
						hands_in_part[hn] = 2
					elif (parts[2] + (parts[3] - parts[2])/2) > self.hands1[hn][
					MAIN_POINTS[2], 0] > (parts[2] - (parts[2] - parts[1])/2):
						hands_in_part[hn] = 4
					elif (parts[4] + (parts[5] - parts[4])/2) > self.hands1[hn][
					MAIN_POINTS[2], 0] > (parts[4] - (parts[4] - parts[3])/2):
						hands_in_part[hn] = 7
					elif (parts[5] + (parts[6] - parts[5])/2) > self.hands1[hn][
					MAIN_POINTS[2], 0] > (parts[5] - (parts[5] - parts[4])/2):
						hands_in_part[hn] = 9
					elif (parts[7] + (parts[8] - parts[7])/2) > self.hands1[hn][
					MAIN_POINTS[2], 0] > (parts[7] - (parts[7] - parts[6])/2):
						hands_in_part[hn] = 12
					elif (parts[8] + (parts[9] - parts[8])/2) > self.hands1[hn][
					MAIN_POINTS[2], 0] > (parts[8] - (parts[8] - parts[7])/2):
						hands_in_part[hn] = 14
					elif (parts[9] + (parts[10] - parts[9])/2) > self.hands1[hn][
					MAIN_POINTS[2], 0] > (parts[9] - (parts[9] - parts[8])/2):
						hands_in_part[hn] = 16

		self.hands_in_part = hands_in_part


	def check_near_table(self):
		# Find the hands are near the table or not.

		hands_touched = {"left": False, "right": False}
		for hn in self.hands0:
			if self.hands0[hn] is not None:
				if self.hands0[hn][MAIN_POINTS[2], 1] > self.table_y:
					if hn == "left":
						hands_touched["right"] = True
					elif hn == "right":
						hands_touched["left"] = True

		self.hands_touched = hands_touched


	def play_keys(self):
		# Play a key sound if the hand in the top view was in a key section
		# and in the front view was near the table. if the hand removed from
		# the key, stop playing that. This operation for each hands will be done.

		for hnd in ["left", "right"]:
			if self.hands_touched[hnd] and \
			self.hands_in_part[hnd] is not None:
				permission = True
				for step in self.hands_touched_last[hnd]:
					if step:
						permission = False
						break

				if permission:
					self.key[hnd] = self.key_names[self.hands_in_part[hnd]]
					print(self.key[hnd])
					self.key_sounds[self.key[hnd]].stop()
					self.key_sounds[self.key[hnd]].play()

			elif not self.hands_touched[hnd] and self.key[hnd] is not \
			None and not self.hands_touched_last[hnd][-1]:
				self.key_sounds[self.key[hnd]].stop()

			self.hands_touched_last[hnd].append(self.hands_touched[hnd])
			if len(self.hands_touched_last[hnd]) > 2:
				self.hands_touched_last[hnd].pop(0)


	def play_music(self):
		# Playing music in desired conditions. Go to the next song
		# if the horizontal velocity of the hands were greater than a
		# determined threshold. To find this, velocity of index fingers
		# in front camera were used.

		if self.new_mode_change:
			# If the mode changed to the MC, play the first song.
			self.new_mode_change = False
			self.music_number = 0
			self.musics[self.music_number].play()

		else:
			# If the mode was on MC, check the hands speed in horizontal
			# direction for changing the song.
			t_now = time.time()
			if (t_now - self.last_change_music) > \
			self.min_time_let_change_music:
				if self.hands_index_last_x is not None and \
				self.hands0["left"] is not None and \
				self.hands0["right"] is not None:
					v_left = self.hands0["left"][MAIN_POINTS[2], 0] \
					- self.hands_index_last_x["left"]
					v_right = self.hands0["right"][MAIN_POINTS[2], 0] \
					- self.hands_index_last_x["right"]
					self.hands_index_last_x["left"] = self.hands0[
					"left"][MAIN_POINTS[2], 0]
					self.hands_index_last_x["right"] = self.hands0[
					"right"][MAIN_POINTS[2], 0]
					if ((v_left + v_right) / 2) > self.change_music_threshold:
						self.musics[self.music_number].stop()
						self.music_number += 1
						if self.music_number >= len(self.musics):
							self.music_number = 0
						self.musics[self.music_number].play()
				elif self.hands0["left"] is not None and \
					self.hands0["right"] is not None:
					self.hands_index_last_x = {"left": self.hands0[
					"left"][MAIN_POINTS[2], 0],
					"right": self.hands0["right"][MAIN_POINTS[2], 0]}
					

	def check_player_mode(self):
		# Change the player mode if the hands faced to the front camera
		# Distance between wrist and index finger must be greater than
		# change_mode_threshold in front camera. Also the hands little finger
		# and thumb reletive positions were used to detect this gesture.
		# Front camera for this implementation was used.

		t_now = time.time()
		if (t_now - self.last_change_mode) \
		> self.min_time_let_change_mode:
			if self.hands0["left"] is not None and \
			self.hands0["right"] is not None:
				if (self.hands0["left"][MAIN_POINTS[1], 0] < \
					self.hands0["left"][MAIN_POINTS[-1], 0]) and (
					self.hands0["right"][MAIN_POINTS[-1], 0] \
					< self.hands0["right"][MAIN_POINTS[1], 0]) and \
					((self.hands0["left"][MAIN_POINTS[0], 1] - self.hands0[
						"left"][MAIN_POINTS[2], 1]) >  self. \
					change_mode_threshold) and ((self.hands0["right"][
						MAIN_POINTS[0], 1] - self.hands0["right"][
						MAIN_POINTS[2], 1]) > self.change_mode_threshold):
						self.last_change_mode = t_now
						self.new_mode_change = True
						if self.player_mode == 1:
							self.musics[self.music_number].stop()
							self.player_mode = 2
						elif (self.player_mode == 2) or self.player_mode is None:
							self.player_mode = 1

	
	def change_volume(self):
		# If the hands are faced to top camera and their vertical
		# movement speed was greater than a desired value, increase the
		# volume and vice versa for the downward movement. To detect this,
		# the hands little finger and thumb reletive positions were used in
		# top camera. speed detected using front camera.

		t_now = time.time()
		if (t_now - self.last_change_volume) > self.min_time_let_change_mode:
			if self.hands1["left"] is not None and \
				self.hands1["right"] is not None:
				if (self.hands1["left"][MAIN_POINTS[1], 0] < \
					self.hands1["left"][MAIN_POINTS[-1], 0]) and (
					self.hands1["right"][MAIN_POINTS[-1], 0] \
					< self.hands1["right"][MAIN_POINTS[1], 0]):
					if self.hands_index_last_y is not None and \
					self.hands0["left"] is not None and self. \
					hands0["right"] is not None:
						v_left = self.hands0["left"][
						MAIN_POINTS[2], 1] - \
						self.hands_index_last_y["left"]
						v_right = self.hands0["right"][
						MAIN_POINTS[2], 1] - \
						self.hands_index_last_y["right"]
						self.hands_index_last_y["left"] = \
						self.hands0["left"][MAIN_POINTS[2], 1]
						self.hands_index_last_y["right"] = \
						self.hands0["right"][MAIN_POINTS[2], 1]
						if (-(v_left + v_right) / 2) > \
						self.increase_music_volume:
							self.last_change_volume = t_now
							for i in range(20):
								keyboard.press(Key.media_volume_up)
								keyboard.release(Key.media_volume_up)
						elif (-(v_left + v_right) / 2) < \
						(-self.increase_music_volume):
							self.last_change_volume = t_now
							for i in range(20):
								keyboard.press(Key.media_volume_down)
								keyboard.release(Key.media_volume_down)
					elif self.hands0["left"] is not None and \
						self.hands0["right"] is not None:
						self.hands_index_last_y = {"left": self.hands0["left"][
						MAIN_POINTS[2], 0], "right": self.hands0["right"][
						MAIN_POINTS[2], 0]}
