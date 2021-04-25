import cv2


def sort_cont(character_contours):
    i = 0
    boundingBoxes = [cv2.boundingRect(c) for c in character_contours]
    (character_contours, boundingBoxes) = zip(
        *sorted(zip(character_contours, boundingBoxes), key=lambda b: b[1][i], reverse=False)
    )
    return character_contours
