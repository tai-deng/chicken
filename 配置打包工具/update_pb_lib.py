#-*- coding: UTF-8 -*-
import sys
import os
import stat
import subprocess
import string
import shutil
import time
import platform

SEP = os.path.sep
INPUT_DIR_ROOT = "."+SEP+"ProtoCfg"
OUTPUT_PYTHON_DIR_ROOT = "."+SEP+"ProtoLib"

# 目录递归拷贝函数
def copyDir(src, dst):
    names = os.listdir(src)
    # 目标文件夹不存在，则新建
    if not os.path.exists(dst):
        os.mkdir(dst)
    # 遍历源文件夹中的文件与文件夹
    for name in names:
        srcname = os.path.join(src, name)
        dstname = os.path.join(dst, name)
        # 是文件夹则递归调用本拷贝函数，否则直接拷贝文件
        if os.path.isdir(srcname):
            copyDir(srcname, dstname)
        else:
            if (not os.path.exists(dstname)
                or ((os.path.exists(dstname))
                    and (os.path.getsize(dstname) != os.path.getsize(srcname)))):
                print(dstname)
                shutil.copy2(srcname, dst)


# 执行protoc转换python代码
def runProtoPython(srcDir, dstDir):
    if not os.path.exists(dstDir):
        print('Error: ' + dstDir + ' not exist!')
        return
    files = []
    for file in os.listdir(srcDir):
        if file.endswith(".proto"):
            files.append(srcDir+SEP+file)

    command = 'ProtoLib' + SEP + 'protoc.exe'
    if platform.system() == "Darwin":
        command = 'ProtoLib' + SEP + 'protoc'
    args = ' -I ' + srcDir + " --python_out=" + dstDir + " " + ' '.join(files)
    totalCommand = command + args
    print(totalCommand)
    if platform.system() == "Darwin":
        commandRunner = subprocess.Popen(totalCommand, shell=True)
        commandRunner.wait()
    else:
        commandRunner = subprocess.Popen(totalCommand)
        commandRunner.wait()


runProtoPython(INPUT_DIR_ROOT, OUTPUT_PYTHON_DIR_ROOT)
time.sleep(1)
