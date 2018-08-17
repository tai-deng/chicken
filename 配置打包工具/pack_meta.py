#-*- coding: UTF-8 -*-
import sys
import os
import stat
import subprocess
import string
import shutil
import time
from xml.etree import ElementTree as ET
#from ProtoLib import BaseMsg_pb2
#from ProtoLib import GameData_pb2
from ProtoLib import GameMeta_pb2
import pyxxtea


SEP = os.path.sep
INPUT_DIR_ROOT = "."+SEP+"XmlMeta"


def genGameMeta(metaVer):
    gameMeta = GameMeta_pb2.GameMeta()

    gameMeta.metaVer = metaVer

    ################################################
    try:
        fileName = INPUT_DIR_ROOT+SEP+"Questions.xml"
        tree = ET.parse(fileName)
        root = tree.getroot()
        for child in root:
            questionsMeta = gameMeta.questionsMeta.add()
            questionsMeta.id = int(child.attrib["id"])
            questionsMeta.difficulty = int(child.attrib["difficulty"])
            questionsMeta.question = child.attrib["question"]
            questionsMeta.answer = bool(child.attrib["answer"])
    except Exception, e:
        print "Error: cannot parse file: " + fileName
        print e
        return None
    
    return gameMeta


def main(argv):
    gameMeta = genGameMeta(113)
    dstFilePath = "meta.dat"
    if gameMeta == None:
        if os.path.isfile(dstFilePath):
            os.remove(dstFilePath)
    else:
        fileData = gameMeta.SerializeToString()
        encryptData = pyxxtea.encrypt(fileData, "Ap499303@.com")
        fp = open(dstFilePath, "wb")
        fp.write(encryptData)
        fp.close()
        test = GameMeta_pb2.GameMeta()
        test.ParseFromString(fileData)
        #print(fileData)
        print(test)


if __name__ == '__main__':
    main(sys.argv)
    time.sleep(1)

#foo.HasField("bar")
#foo.nums.append(15)
#bar=foo.bars.add()
