import setuptools

with open("README.md", "r") as fh:
    long_description = fh.read()

setuptools.setup(
    name="NodeSocket",
    version="0.3.2",
    author="Jeremy Kanovsky",
    author_email="kanovsky.jeremy@gmail.com",
    description="A lightweight Node.js ↔ Python data socket",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/0xJeremy/socket.py",
    packages=setuptools.find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License"
    ],
)